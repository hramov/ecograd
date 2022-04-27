import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { Attach } from 'src/database/models/order/Attach.model';
import { Inquire } from 'src/database/models/order/Inquire.model';
import { Order } from 'src/database/models/order/Order.model';
import { Section } from 'src/database/models/order/Section.model';
import { Client } from 'src/database/models/user/profiles/Client.model';
import { Expert } from 'src/database/models/user/profiles/Expert.model';
import { User } from 'src/database/models/user/User.model';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AttachDto } from './dto/attach.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UploadFileDto, UploadFileForSectionDto } from './dto/upload-file.dto';
import { UploadInquireDto } from './dto/upload-inquire.dto';

export enum OrderTypes {
	'Объект капитального строительства' = 1,
	'Линейный объект' = 2,
}

const LINEAR_SECTIONS_COUNT = 10;
const CAP_SECTIONS_COUNT = 12;

@Injectable()
export class OrderService {
	async uploadInquire(
		user: CreateUserDto,
		dto: UploadInquireDto,
		files: Array<Express.Multer.File>,
	) {
		const order = await Order.findOne({
			where: {
				id: dto.order_id,
			},
		});

		if (!order) {
			throw new NotFoundException();
		}

		if (files.length == 0) throw new BadRequestException();

		try {
			const file = files[0] as Express.Multer.File;
			const size = file.size;
			if (size > 10_000_000_000) {
				throw 'File size overflow';
			}

			const dto = {
				title: file.originalname,
				path:
					'public/orders/' + order.id + '/inquires/' + file.filename,
				order: order as Order,
				user: user as User,
			};

			const inquire = Inquire.create({ ...dto });
			await inquire.save();
		} catch (_err) {
			const err = _err as Error;
			Logger.error(err.message);
			throw new InternalServerErrorException();
		}

		return {
			message: 'Successfully uploaded file!',
		};
	}

	async getInquire(order_id: number) {
		const order = await Order.findOne({
			where: {
				id: order_id,
			},
		});

		if (!order) {
			throw new NotFoundException();
		}

		const inquires = await Inquire.find({
			where: { order: { id: order.id } },
			order: { createdAt: 'DESC' },
		});

		return inquires;
	}

	async addOrder(user_id: number, dto: CreateOrderDto) {
		const client = await Client.findOne({
			where: { user: { id: user_id } },
		});

		if (!client) {
			Logger.error(
				'addOrder',
				`Cannot find client associated with user ID: ${user_id}`,
			);
			throw new NotFoundException();
		}

		const order = Order.create({
			title: dto.title,
			exp_type: dto.exp_type,
			object_type: dto.object_type,
			docs_cipher: dto.docs_cipher,
			rii_cipher: dto.rii_cipher,
			status: 'new',
			client: client,
			expert: null,
		});

		await order.save();
		Logger.log(`Successfully added order with ID: ${order.id}`);
		return order;
	}

	async getOrderByID(order_id: number) {
		const result = await Order.query(
			`SELECT o.id, o.title, o.exp_type, o.object_type, o.status, o."createdAt", 
						c.phone as client_phone, 
						u.name as client_name, u.email as client_email,
						array_to_string(array_agg(distinct(concat(s.arrange, ' ', s.title))), ';') as sections
				FROM business.order o 
				JOIN auth.client c on o."clientId" = c.id
				JOIN auth.user u on u.id = c."userId"
				JOIN business.section s on s."orderId" = o.id
				JOIN business.attach a on a."sectionId" = s.id
				WHERE a.id > 0 AND o.id = ${order_id}
				GROUP BY o.id, c.id, u.id
				`,
		);
		return result[0];
	}

	async getOrdersWithoutExpert() {
		return await Order.find({ where: { expert: null } });
	}

	async getSections(exp_type: number, object_type: number) {
		if (!exp_type) throw new BadRequestException();

		if (!object_type && (exp_type == 2 || exp_type == 3))
			throw new BadRequestException();

		const object_section_linear = [
			{ code: '1', title: 'Пояснительная записка' },
			{
				code: '2',
				title: 'Проект полосы отвода',
			},
			{
				code: '3',
				title: 'Технологические и конструктивные решения линейного объекта. Искусственные сооружения',
			},
			{
				code: '4',
				title: 'Здания, строения и сооружения, входящие в инфраструктуру линейного объекта',
			},
			{ code: '5', title: 'Проект организации строительства' },
			{
				code: '6',
				title: 'Проект организации работ по сносу (демонтажу) линейного объекта',
			},
			{ code: '7', title: 'Мероприятия по охране окружающей среды' },
			{
				code: '8',
				title: 'Мероприятия по обеспечению пожарной безопасности',
			},
			{ code: '9', title: 'Смета на строительство' },
			{
				code: '10',
				title: 'Иная документация в случаях, предусмотренных федеральными законами',
			},
		];

		const object_section_cap = [
			{
				code: '1',
				title: 'Схема планировочной организации земельного участка',
			},
			{
				code: '2',
				title: 'Схема планировочной организации земельного участка',
			},
			{
				code: '3',
				title: `Архитектурные решения`,
			},
			{
				code: '4',
				title: `Конструктивные и объемно-планировочные решения`,
			},
			{
				code: '5',
				title: `Сведения об инженерном оборудовании, о сетях инженерно-технического обеспечения, перечень инженерно-технических мероприятий, содержание технологических решений`,
				sub: [
					{
						code: '5.1',
						title: 'подраздел Система электроснабжения',
					},
					{
						code: '5.2',
						title: 'подраздел Система водоснабжения',
					},
					{
						code: '5.3',
						title: 'подраздел Система водоотведения',
					},
					{
						code: '5.4',
						title: 'подраздел Отопление, вентиляцияи кондиционирование воздуха, тепловые сети',
					},
					{
						code: '5.5',
						title: 'подраздел Сети связи',
					},
					{
						code: '5.6',
						title: 'подраздел Система газоснабжения',
					},
					{
						code: '5.7',
						title: 'подраздел Технологические решения',
					},
				],
			},
			{
				code: '6',
				title: `Проект организации строительства`,
			},
			{
				code: '7',
				title: `Проект организации работ по сносу или демонтажу объектов капитального строительства`,
			},
			{
				code: '8',
				title: `Перечень мероприятий по охране окружающей среды`,
			},
			{
				code: '9',
				title: 'Мероприятия по обеспечению пожарной безопасности',
			},
			{
				code: '10',
				title: `Мероприятия по обеспечению доступа инвалидов`,
			},
			{
				code: '11',
				title: `Смета на строительство объектов капитального строительства`,
			},
			{
				code: '12',
				title: 'Иная документация в случаях, предусмотренных федеральными законами',
			},
		];

		const exp_sections = [
			{
				code: this.getRiiSectionCode(exp_type, object_type, 1),
				title: 'Отчет по инженерно-геодезическим изысканиям',
			},
			{
				code: this.getRiiSectionCode(exp_type, object_type, 2),
				title: 'Отчет по инженерно-геологическим изысканиям',
			},
			{
				code: this.getRiiSectionCode(exp_type, object_type, 3),
				title: 'Отчет по инженерно-гидрометеорологическим изысканиям',
			},
			{
				code: this.getRiiSectionCode(exp_type, object_type, 4),
				title: 'Отчет по инженерно-экологическим изысканиям',
			},
			{
				code: this.getRiiSectionCode(exp_type, object_type, 5),
				title: 'Отчет по инженерно-геотехническим изысканиям',
			},
			{
				code: this.getRiiSectionCode(exp_type, object_type, 6),
				title: 'Отчет по геотехническим исследованиям',
			},
			{
				code: this.getRiiSectionCode(exp_type, object_type, 7),
				title: 'Отчет по обследованию состояния грунтов оснований зданий и сооружений',
			},
			{
				code: this.getRiiSectionCode(exp_type, object_type, 8),
				title: 'Отчет по локальному мониторингу компонентов окружающей среды',
			},
			{
				code: this.getRiiSectionCode(exp_type, object_type, 9),
				title: 'Отчет по поиску и разведке подземных вод для целей водоснабжения',
			},
			{
				code: this.getRiiSectionCode(exp_type, object_type, 10),
				title: 'Отчет по разведке грунтовых строительных материалов',
			},
			{
				code: this.getRiiSectionCode(exp_type, object_type, 11),
				title: 'Отчет по локальному обследования загрязнения грунтов и грунтовых вод',
			},
		];

		if (exp_type == 1) {
			return exp_sections;
		} else if (exp_type == 2) {
			if (object_type == 1) {
				return object_section_cap;
			} else if (object_type == 2) {
				return object_section_linear;
			} else {
				throw new NotFoundException('object_type');
			}
		} else if (exp_type == 3) {
			if (object_type == 1) {
				return [...object_section_cap, ...exp_sections];
			} else if (object_type == 2) {
				return [...object_section_linear, ...exp_sections];
			} else {
				throw new NotFoundException('object_type');
			}
		} else {
			throw new NotFoundException('exp_type');
		}
	}

	private getRiiSectionCode(
		exp_type: number,
		object_type: number,
		arrange: number = 0,
	) {
		if (exp_type == 1) return String(arrange);
		if (exp_type == 2) return 0;
		if (exp_type == 3) {
			if (object_type == 1) {
				return String(CAP_SECTIONS_COUNT + arrange);
			} else if (object_type == 2) {
				return String(LINEAR_SECTIONS_COUNT + arrange);
			}
		}
	}

	async getAttachesForSection(user_id: number, section_id: number) {
		if (!section_id) throw new BadRequestException();

		const attaches = await Attach.find({
			where: { section: { id: section_id } },
			relations: ['sender'],
			order: {
				createdAt: 'DESC',
			},
		});

		for await (const attach of attaches) {
			if (user_id != attach.sender.id) {
				attach.is_new = false;
				await attach.save();
			}
		}

		return attaches;
	}

	async getOrdersForClient(user_id: number) {
		const orders = await Order.query(
			`select o.* from business.order o
			join auth.client c on o."clientId" = c.id
			join auth.user u on c."userId" = u.id
			where u.id = ${user_id}
			`,
		);

		for (const order of orders) {
			order.sections = await Section.find({
				where: {
					order: { id: order.id },
				},
				order: { arrange: 'ASC' },
			});
			for (const section of order.sections) {
				section.attach = await Attach.find({
					where: {
						section: { id: section.id },
					},
				});
			}
		}
		return orders;
	}

	async getOrdersForExpert(user_id: number) {
		const orders = await Order.query(
			`select o.* from business.order o
			join auth.expert e on o."expertId" = e.id
			join auth.user u on e."userId" = u.id
			where u.id = ${user_id}
			`,
		);

		for (const order of orders) {
			order.sections = await Section.find({
				where: {
					order: { id: order.id },
				},
				order: { arrange: 'ASC' },
			});
			for (const section of order.sections) {
				section.attach = await Attach.find({
					where: {
						section: { id: section.id },
					},
				});
			}
		}
		return orders;
	}

	async getExpertForOrder(order_id: number) {
		return await Order.query(
			`
			SELECT e.id, u.name
			FROM auth.expert e
			JOIN auth.user u on e."userId" = u.id
			JOIN business.order o on o."expertId" = e.id
			WHERE o.id = ${order_id};
			`,
		);
	}

	async checkChanges(sender_id: number) {
		const query = `
			SELECT o.id as order_id, s.id as section_id, a.id as attach_id FROM business.order o
			JOIN business.section s ON s."orderId" = o.id
			JOIN business.attach a ON a."sectionId" = s.id
			WHERE a.is_new = true AND a."senderId" <> ${sender_id}
		`;

		const result = await Order.query(query);
		return result;
	}

	async uploadFile(
		uploadFileDto: UploadFileDto,
		files: Array<Express.Multer.File>,
		order_id: number,
		sender: CreateUserDto,
	) {
		const order = await Order.findOne({
			where: {
				id: order_id,
			},
		});
		if (!order) {
			throw new NotFoundException(
				'Order with ID: ' + order_id + ' not found',
			);
		}

		for (let i = 0; i < files.length; i++) {
			const section = Section.create({
				arrange: files[i].fieldname,
				title: uploadFileDto[files[i].fieldname],
				status: 'new',
				order: order,
			});
			await section.save();
			try {
				const file = files[i] as Express.Multer.File;
				const size = file.size;
				if (size > 10_000_000_000) {
					throw 'File size overflow';
				}
				const attach = Attach.create({
					title: file.originalname,
					path:
						'public/orders/' +
						order.id +
						'/' +
						section.arrange +
						'/' +
						file.filename,
					is_new: true,
					order,
					section,
					sender,
				});
				await attach.save();
			} catch (_err) {
				const err = _err as Error;
				Logger.error(err.message);
				throw new InternalServerErrorException();
			}
		}
	}

	async uploadFileForSection(
		sender: CreateUserDto,
		files: Array<Express.Multer.File>,
		dto: UploadFileForSectionDto,
	) {
		const order = await Order.findOne({
			where: {
				id: dto.order_id,
			},
		});
		if (!order) throw new NotFoundException('Order not found');

		const section = await Section.findOne({
			where: { id: dto.section_id },
		});
		if (!section) throw new NotFoundException('Section not found');

		if (files.length == 0) throw new BadRequestException('No files');

		try {
			const file = files[0] as Express.Multer.File;
			const size = file.size;
			if (size > 10_000_000_000) {
				throw 'File size overflow';
			}
			if (size > 10_000_000_000)
				throw new BadRequestException('File size overflow');

			const attach = Attach.create({
				title: file.originalname,
				path:
					'public/orders/' +
					order.id +
					'/' +
					section.arrange +
					'/' +
					file.filename,
				is_new: true,
				order,
				section,
				sender,
			});
			await attach.save();
			if (sender.profile == 'Эксперт') {
				section.status = 'taken';
				await section.save();
			}
			return {
				message: 'Files successfully uploaded',
			};
		} catch (_err) {
			const err = _err as Error;
			Logger.error(err.message);
			throw new InternalServerErrorException(err);
		}
	}

	async appointExpert(order_id: number, expert_id: number) {
		if (!order_id || !expert_id) throw new BadRequestException();

		const order = await Order.findOne({
			where: {
				id: order_id,
				expert: null,
			},
		});

		if (!order) {
			throw new NotFoundException(
				'order',
				'Cannot find order with id ' +
					order_id +
					' or the order might already has expert appointed',
			);
		}

		const expert = await Expert.findOne({ where: { id: expert_id } });
		if (!expert) {
			throw new NotFoundException(
				'expert',
				'Cannot find expert with id ' + expert_id,
			);
		}

		order.expert = expert;
		order.status = 'taken';
		return await order.save();
	}

	async changeOrderStatus(dto: ChangeOrderStatusDto) {
		if (!dto.order_id || !dto.status) throw new BadRequestException();

		const order = await Order.findOne({ where: { id: dto.order_id } });

		if (!order) {
			throw new NotFoundException(
				'order',
				'Cannot find order with id ' + dto.order_id,
			);
		}

		order.status = dto.status;
		await order.save();

		return {
			message: 'Successfully updated order with status ' + dto.status,
		};
	}

	async setAttachOpened(dto: AttachDto) {
		const attach = await Attach.findOne({ where: { id: dto.id } });
		attach.is_new = dto.is_new;
		return await Attach.save(attach);
	}

	async changeSectionStatus(section_id: number, status: string) {
		if (!section_id || !status) throw new BadRequestException();

		const section = await Section.findOne({
			where: { id: section_id },
		});

		if (!section) {
			throw new NotFoundException(
				'section',
				'Cannot find section with id ' + section_id,
			);
		}

		section.status = status;
		await section.save();

		return {
			message: 'Successfully updated section with status ' + status,
		};
	}

	async getSectionByID(section_id: number) {
		return await Section.findOne({
			where: {
				id: section_id,
			},
		});
	}

	async getSectionsForOrder(order_id: number) {
		// return await Section.query(`
		// 	SELECT * FROM business.section s
		// 	LEFT JOIN business.attach a on a."sectionId" = s.id
		// 	WHERE s."orderId" = ${order_id}
		// 	AND a."sectionId" = s.id
		// 	ORDER BY s.arrange ASC
		// `);
		const sections = await Section.find({
			where: {
				order: {
					id: order_id,
				},
			},
			order: {
				arrange: 'ASC',
			},
		});
		for await (const section of sections) {
			section.attach = await Attach.find({
				where: {
					section: { id: section.id },
				},
				order: { createdAt: 'DESC' },
			});
		}
		return sections;
	}

	async getOrders() {
		return await Order.query(
			`SELECT o.id, o.title, o.exp_type, o.object_type, o.status, o."createdAt",
							c.phone as client_phone,
							u.name, u.email as client_email,
							array_to_string(array_agg(distinct(concat(s.arrange, ' ', s.title))), ';') as sections
					FROM business.order o
					JOIN auth.client c on o."clientId" = c.id
					JOIN auth.user u on u.id = c."userId"
					JOIN business.section s on s."orderId" = o.id
					JOIN business.attach a on a."sectionId" = s.id
					WHERE a.id > 0
					GROUP BY o.id, c.id, u.id
					ORDER BY o.id desc
					`,
		);
	}

	async appointmentExpert(order_id: number) {
		const result = await Order.query(
			`
				SELECT e.id, u.name
				FROM auth.expert e
				JOIN auth.user u on e."userId" = u.id
				JOIN business.order o on o."expertId" = e.id
				WHERE o.id = ${order_id};
				`,
		);
		return result[0];
	}
}

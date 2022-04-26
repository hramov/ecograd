import { Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/guards/admin-auth.guard';
import { ExpertAuthGuard } from 'src/auth/guards/expert-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get('/check-changes')
	@UseGuards(JwtAuthGuard)
	async checkChanges() {
		return await this.orderService.checkChanges();
	}

	@Post('/upload-file/:order_id')
	@UseGuards(JwtAuthGuard)
	async uploadFile() {
		return await this.orderService.uploadFile();
	}

	@Post('/upload-file-for-section')
	@UseGuards(JwtAuthGuard)
	async uploadFileForSection() {
		return await this.orderService.uploadFileForSection();
	}

	@Patch('/appoint-expert/:order_id')
	@UseGuards(AdminAuthGuard)
	async appointExpert() {
		return await this.orderService.appointExpert();
	}

	@Patch('/change-order-status')
	@UseGuards(ExpertAuthGuard)
	async changeOrderStatus() {
		return await this.orderService.changeOrderStatus();
	}

	@Patch('/set-attach-opened/:attach_id')
	@UseGuards(JwtAuthGuard)
	async setAttachOpened() {
		return await this.orderService.setAttachOpened();
	}

	@Patch('/change-section-status/:section_id')
	@UseGuards(JwtAuthGuard)
	async changeSectionStatus() {
		return await this.orderService.changeSectionStatus();
	}

	// router.get(
	// 	'/no-expert',
	// 	passport.authenticate(new JWTStrategy(), { session: false }),
	// 	getOrdersWithoutExpert,
	// );

	// router.get(
	// 	'/sections-dict/:exp_type/:object_type',
	// 	passport.authenticate(new JWTStrategy(), { session: false }),
	// 	getSections,
	// );

	// router.get(
	// 	'/attaches-for-section/:section_id',
	// 	passport.authenticate(new JWTStrategy(), { session: false }),
	// 	getAttachesForSection,
	// );

	// router.get(
	// 	'/client',
	// 	passport.authenticate(new ClientStrategy(), { session: false }),
	// 	getOrdersForClient,
	// );

	// router.get(
	// 	'/expert',
	// 	passport.authenticate(new ExpertStrategy(), { session: false }),
	// 	getOrdersForExpert,
	// );

	// router.get(
	// 	'/expert-for-order/:order_id',
	// 	passport.authenticate(new JWTStrategy(), { session: false }),
	// 	getExpertForOrder,
	// );

	// router.get(
	// 	'/expert/:order_id',
	// 	passport.authenticate(new AdminStrategy(), { session: false }),
	// 	async (req: Request, res: Response) => {
	// 		if (!req.params.order_id) return BadRequestError(res);
	// 		SendSuccessGetReply(
	// 			res,
	// 			(
	// 				await Order.query(
	// 					`
	// 				SELECT e.id, u.name
	// 				FROM auth.expert e
	// 				JOIN auth.user u on e."userId" = u.id
	// 				JOIN business.order o on o."expertId" = e.id
	// 				WHERE o.id = ${req.params.order_id};
	// 				`,
	// 				)
	// 			)[0],
	// 		);
	// 	},
	// );

	// router.get(
	// 	'/section/:section_id',
	// 	passport.authenticate(new JWTStrategy(), { session: false }),
	// 	async (req: Request, res: Response) => {
	// 		if (!req.params.section_id) {
	// 			return BadRequestError(res);
	// 		}
	// 		SendSuccessGetReply(
	// 			res,
	// 			await Section.findOne({
	// 				where: {
	// 					id: parseInt(req.params.section_id),
	// 				},
	// 			}),
	// 		);
	// 	},
	// );

	// router.post(
	// 	'/upload-inquire',
	// 	passport.authenticate(new JWTStrategy(), { session: false }),
	// 	uploadInquire,
	// );

	// router.get(
	// 	'/inquire/:order_id',
	// 	passport.authenticate(new JWTStrategy(), { session: false }),
	// 	getInquire,
	// );

	// router.get(
	// 	'/sections/:order_id',
	// 	passport.authenticate(new JWTStrategy(), { session: false }),
	// 	async (req: Request, res: Response) => {
	// 		if (!req.params.order_id) {
	// 			return BadRequestError(res);
	// 		}
	// 		const sections = await Section.find({
	// 			where: {
	// 				order: {
	// 					id: parseInt(req.params.order_id),
	// 				},
	// 			},
	// 			order: {
	// 				arrange: 'ASC',
	// 			},
	// 		});

	// 		for await (const section of sections) {
	// 			section.attach = await Attach.findBy({
	// 				section: { id: section.id },
	// 			});
	// 		}

	// 		SendSuccessGetReply(
	// 			res,
	// 			sections.filter((section: Section) => section.attach.length),
	// 		);
	// 	},
	// );

	// router.post(
	// 	'/',
	// 	passport.authenticate(new ClientStrategy(), { session: false }),
	// 	addOrder,
	// );

	// router.get(
	// 	'/:order_id',
	// 	passport.authenticate(new JWTStrategy(), { session: false }),
	// 	async (req: Request, res: Response) => {
	// 		if (!req.params.order_id) return BadRequestError(res);
	// 		try {
	// 			SendSuccessGetReply(
	// 				res,
	// 				(
	// 					await Order.query(
	// 						`SELECT o.id, o.title, o.exp_type, o.object_type, o.status, o."createdAt",
	// 						c.phone as client_phone,
	// 						u.name as client_name, u.email as client_email,
	// 						array_to_string(array_agg(distinct(concat(s.arrange, ' ', s.title))), ';') as sections
	// 				FROM business.order o
	// 				JOIN auth.client c on o."clientId" = c.id
	// 				JOIN auth.user u on u.id = c."userId"
	// 				JOIN business.section s on s."orderId" = o.id
	// 				JOIN business.attach a on a."sectionId" = s.id
	// 				WHERE a.id > 0 AND o.id = ${req.params.order_id}
	// 				GROUP BY o.id, c.id, u.id
	// 				`,
	// 					)
	// 				)[0],
	// 			);
	// 		} catch (_err) {
	// 			const err = _err as Error;
	// 			Logger.writeError('getOrder', err.message);
	// 			NotFoundError(res, 'order', err.message);
	// 		}
	// 	},
	// );

	// router.get(
	// 	'/',
	// 	passport.authenticate(new AdminStrategy(), { session: false }),
	// 	async (req: Request, res: Response) =>
	// 		SendSuccessGetReply<Order[]>(
	// 			res,
	// 			await Order.query(
	// 				`SELECT o.id, o.title, o.exp_type, o.object_type, o.status, o."createdAt",
	// 						c.phone as client_phone,
	// 						u.name, u.email as client_email,
	// 						array_to_string(array_agg(distinct(concat(s.arrange, ' ', s.title))), ';') as sections
	// 				FROM business.order o
	// 				JOIN auth.client c on o."clientId" = c.id
	// 				JOIN auth.user u on u.id = c."userId"
	// 				JOIN business.section s on s."orderId" = o.id
	// 				JOIN business.attach a on a."sectionId" = s.id
	// 				WHERE a.id > 0
	// 				GROUP BY o.id, c.id, u.id
	// 				ORDER BY o.id desc
	// 				`,
	// 			),
	// 		),
	// );
}

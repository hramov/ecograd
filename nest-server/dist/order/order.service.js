"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = exports.OrderTypes = void 0;
const common_1 = require("@nestjs/common");
const Attach_model_1 = require("../database/models/order/Attach.model");
const Inquire_model_1 = require("../database/models/order/Inquire.model");
const Order_model_1 = require("../database/models/order/Order.model");
const Section_model_1 = require("../database/models/order/Section.model");
const Client_model_1 = require("../database/models/user/profiles/Client.model");
const Expert_model_1 = require("../database/models/user/profiles/Expert.model");
var OrderTypes;
(function (OrderTypes) {
    OrderTypes[OrderTypes["\u041E\u0431\u044A\u0435\u043A\u0442 \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430"] = 1] = "\u041E\u0431\u044A\u0435\u043A\u0442 \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430";
    OrderTypes[OrderTypes["\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 \u043E\u0431\u044A\u0435\u043A\u0442"] = 2] = "\u041B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 \u043E\u0431\u044A\u0435\u043A\u0442";
})(OrderTypes = exports.OrderTypes || (exports.OrderTypes = {}));
const LINEAR_SECTIONS_COUNT = 10;
const CAP_SECTIONS_COUNT = 12;
let OrderService = class OrderService {
    async uploadInquire(user, dto, files) {
        const order = await Order_model_1.Order.findOne({
            where: {
                id: dto.order_id,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException();
        }
        if (files.length == 0)
            throw new common_1.BadRequestException();
        try {
            const file = files[0];
            const size = file.size;
            if (size > 10000000000) {
                throw 'File size overflow';
            }
            const dto = {
                title: file.originalname,
                path: 'public/orders/' + order.id + '/inquires/' + file.filename,
                order: order,
                user: user,
            };
            const inquire = Inquire_model_1.Inquire.create(Object.assign({}, dto));
            await inquire.save();
        }
        catch (_err) {
            const err = _err;
            common_1.Logger.error(err.message);
            throw new common_1.InternalServerErrorException();
        }
        return {
            message: 'Successfully uploaded file!',
        };
    }
    async getInquire(order_id) {
        const order = await Order_model_1.Order.findOne({
            where: {
                id: order_id,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException();
        }
        const inquires = await Inquire_model_1.Inquire.find({
            where: { order: { id: order.id } },
            order: { createdAt: 'DESC' },
        });
        return inquires;
    }
    async addOrder(user_id, dto) {
        const client = await Client_model_1.Client.findOne({
            where: { user: { id: user_id } },
        });
        if (!client) {
            common_1.Logger.error('addOrder', `Cannot find client associated with user ID: ${user_id}`);
            throw new common_1.NotFoundException();
        }
        const order = Order_model_1.Order.create({
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
        common_1.Logger.log(`Successfully added order with ID: ${order.id}`);
        return order;
    }
    async getOrderByID(order_id) {
        const result = await Order_model_1.Order.query(`SELECT o.id, o.title, o.exp_type, o.object_type, o.status, o."createdAt", 
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
				`);
        return result[0];
    }
    async getOrdersWithoutExpert() {
        return await Order_model_1.Order.find({ where: { expert: null } });
    }
    async getSections(exp_type, object_type) {
        if (!exp_type)
            throw new common_1.BadRequestException();
        if (!object_type && (exp_type == 2 || exp_type == 3))
            throw new common_1.BadRequestException();
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
        }
        else if (exp_type == 2) {
            if (object_type == 1) {
                return object_section_cap;
            }
            else if (object_type == 2) {
                return object_section_linear;
            }
            else {
                throw new common_1.NotFoundException('object_type');
            }
        }
        else if (exp_type == 3) {
            if (object_type == 1) {
                return [...object_section_cap, ...exp_sections];
            }
            else if (object_type == 2) {
                return [...object_section_linear, ...exp_sections];
            }
            else {
                throw new common_1.NotFoundException('object_type');
            }
        }
        else {
            throw new common_1.NotFoundException('exp_type');
        }
    }
    getRiiSectionCode(exp_type, object_type, arrange = 0) {
        if (exp_type == 1)
            return String(arrange);
        if (exp_type == 2)
            return 0;
        if (exp_type == 3) {
            if (object_type == 1) {
                return String(CAP_SECTIONS_COUNT + arrange);
            }
            else if (object_type == 2) {
                return String(LINEAR_SECTIONS_COUNT + arrange);
            }
        }
    }
    async getAttachesForSection(user_id, section_id) {
        var e_1, _a;
        if (!section_id)
            throw new common_1.BadRequestException();
        const attaches = await Attach_model_1.Attach.find({
            where: { section: { id: section_id } },
            relations: ['sender'],
            order: {
                createdAt: 'DESC',
            },
        });
        try {
            for (var attaches_1 = __asyncValues(attaches), attaches_1_1; attaches_1_1 = await attaches_1.next(), !attaches_1_1.done;) {
                const attach = attaches_1_1.value;
                if (user_id != attach.sender.id) {
                    attach.is_new = false;
                    await attach.save();
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (attaches_1_1 && !attaches_1_1.done && (_a = attaches_1.return)) await _a.call(attaches_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return attaches;
    }
    async getOrdersForClient(user_id) {
        const orders = await Order_model_1.Order.query(`select o.* from business.order o
			join auth.client c on o."clientId" = c.id
			join auth.user u on c."userId" = u.id
			where u.id = ${user_id}
			`);
        for (const order of orders) {
            order.sections = await Section_model_1.Section.find({
                where: {
                    order: { id: order.id },
                },
                order: { arrange: 'ASC' },
            });
            for (const section of order.sections) {
                section.attach = await Attach_model_1.Attach.find({
                    where: {
                        section: { id: section.id },
                    },
                });
            }
        }
        return orders;
    }
    async getOrdersForExpert(user_id) {
        const orders = await Order_model_1.Order.query(`select o.* from business.order o
			join auth.expert e on o."expertId" = e.id
			join auth.user u on e."userId" = u.id
			where u.id = ${user_id}
			`);
        for (const order of orders) {
            order.sections = await Section_model_1.Section.find({
                where: {
                    order: { id: order.id },
                },
                order: { arrange: 'ASC' },
            });
            for (const section of order.sections) {
                section.attach = await Attach_model_1.Attach.find({
                    where: {
                        section: { id: section.id },
                    },
                });
            }
        }
        return orders;
    }
    async getExpertForOrder(order_id) {
        return await Order_model_1.Order.query(`
			SELECT e.id, u.name
			FROM auth.expert e
			JOIN auth.user u on e."userId" = u.id
			JOIN business.order o on o."expertId" = e.id
			WHERE o.id = ${order_id};
			`);
    }
    async checkChanges(sender_id) {
        const query = `
			SELECT o.id as order_id, s.id as section_id, a.id as attach_id FROM business.order o
			JOIN business.section s ON s."orderId" = o.id
			JOIN business.attach a ON a."sectionId" = s.id
			WHERE a.is_new = true AND a."senderId" <> ${sender_id}
		`;
        const result = await Order_model_1.Order.query(query);
        return result;
    }
    async uploadFile(uploadFileDto, files, order_id, sender) {
        const order = await Order_model_1.Order.findOne({
            where: {
                id: order_id,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order with ID: ' + order_id + ' not found');
        }
        for (let i = 0; i < files.length; i++) {
            const section = Section_model_1.Section.create({
                arrange: files[i].fieldname,
                title: uploadFileDto[files[i].fieldname],
                status: 'new',
                order: order,
            });
            await section.save();
            try {
                const file = files[i];
                const size = file.size;
                if (size > 10000000000) {
                    throw 'File size overflow';
                }
                const attach = Attach_model_1.Attach.create({
                    title: file.originalname,
                    path: 'public/orders/' +
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
            }
            catch (_err) {
                const err = _err;
                common_1.Logger.error(err.message);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async uploadFileForSection(sender, files, dto) {
        const order = await Order_model_1.Order.findOne({
            where: {
                id: dto.order_id,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const section = await Section_model_1.Section.findOne({
            where: { id: dto.section_id },
        });
        if (!section)
            throw new common_1.NotFoundException('Section not found');
        if (files.length == 0)
            throw new common_1.BadRequestException('No files');
        try {
            const file = files[0];
            const size = file.size;
            if (size > 10000000000) {
                throw 'File size overflow';
            }
            if (size > 10000000000)
                throw new common_1.BadRequestException('File size overflow');
            const attach = Attach_model_1.Attach.create({
                title: file.originalname,
                path: 'public/orders/' +
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
        }
        catch (_err) {
            const err = _err;
            common_1.Logger.error(err.message);
            throw new common_1.InternalServerErrorException(err);
        }
    }
    async appointExpert(order_id, expert_id) {
        if (!order_id || !expert_id)
            throw new common_1.BadRequestException();
        const order = await Order_model_1.Order.findOne({
            where: {
                id: order_id,
                expert: null,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('order', 'Cannot find order with id ' +
                order_id +
                ' or the order might already has expert appointed');
        }
        const expert = await Expert_model_1.Expert.findOne({ where: { id: expert_id } });
        if (!expert) {
            throw new common_1.NotFoundException('expert', 'Cannot find expert with id ' + expert_id);
        }
        order.expert = expert;
        order.status = 'taken';
        return await order.save();
    }
    async changeOrderStatus(dto) {
        if (!dto.order_id || !dto.status)
            throw new common_1.BadRequestException();
        const order = await Order_model_1.Order.findOne({ where: { id: dto.order_id } });
        if (!order) {
            throw new common_1.NotFoundException('order', 'Cannot find order with id ' + dto.order_id);
        }
        order.status = dto.status;
        await order.save();
        return {
            message: 'Successfully updated order with status ' + dto.status,
        };
    }
    async setAttachOpened(dto) {
        const attach = await Attach_model_1.Attach.findOne({ where: { id: dto.id } });
        attach.is_new = dto.is_new;
        return await Attach_model_1.Attach.save(attach);
    }
    async changeSectionStatus(section_id, status) {
        if (!section_id || !status)
            throw new common_1.BadRequestException();
        const section = await Section_model_1.Section.findOne({
            where: { id: section_id },
        });
        if (!section) {
            throw new common_1.NotFoundException('section', 'Cannot find section with id ' + section_id);
        }
        section.status = status;
        await section.save();
        return {
            message: 'Successfully updated section with status ' + status,
        };
    }
    async getSectionByID(section_id) {
        return await Section_model_1.Section.findOne({
            where: {
                id: section_id,
            },
        });
    }
    async getSectionsForOrder(order_id) {
        var e_2, _a;
        const sections = await Section_model_1.Section.find({
            where: {
                order: {
                    id: order_id,
                },
            },
            order: {
                arrange: 'ASC',
            },
        });
        try {
            for (var sections_1 = __asyncValues(sections), sections_1_1; sections_1_1 = await sections_1.next(), !sections_1_1.done;) {
                const section = sections_1_1.value;
                section.attach = await Attach_model_1.Attach.find({
                    where: {
                        section: { id: section.id },
                    },
                    order: { createdAt: 'DESC' },
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (sections_1_1 && !sections_1_1.done && (_a = sections_1.return)) await _a.call(sections_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return sections;
    }
    async getOrders() {
        return await Order_model_1.Order.query(`SELECT o.id, o.title, o.exp_type, o.object_type, o.status, o."createdAt",
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
					`);
    }
    async appointmentExpert(order_id) {
        const result = await Order_model_1.Order.query(`
				SELECT e.id, u.name
				FROM auth.expert e
				JOIN auth.user u on e."userId" = u.id
				JOIN business.order o on o."expertId" = e.id
				WHERE o.id = ${order_id};
				`);
        return result[0];
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)()
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map
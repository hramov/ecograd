"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const admin_strategy_1 = require("../../../../auth/strategy/admin.strategy");
const client_strategy_1 = require("../../../../auth/strategy/client.strategy");
const expert_strategy_1 = require("../../../../auth/strategy/expert.strategy");
const jwt_strategy_1 = require("../../../../auth/strategy/jwt.strategy");
const Attach_model_1 = require("../../../database/model/order/Attach.model");
const Order_model_1 = require("../../../database/model/order/Order.model");
const Section_model_1 = require("../../../database/model/order/Section.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
const logger_1 = require("../../../logger");
const add_order_router_1 = require("./add-order.router");
const appoint_expert_router_1 = require("./appoint-expert.router");
const change_order_status_router_1 = require("./change-order-status.router");
const change_section_status_router_1 = require("./change-section-status.router");
const check_changes_router_1 = require("./check-changes.router");
const get_attaches_for_section_router_1 = require("./get-attaches-for-section.router");
const get_expert_for_order_router_1 = require("./get-expert-for-order.router");
const get_inquire_router_1 = require("./get-inquire.router");
const get_orders_for_client_router_1 = require("./get-orders-for-client.router");
const get_orders_for_expert_router_1 = require("./get-orders-for-expert.router");
const get_orders_without_expert_router_1 = require("./get-orders-without-expert.router");
const get_sections_router_1 = require("./get-sections.router");
const upload_file_for_section_router_1 = require("./upload-file-for-section.router");
const upload_file_router_1 = require("./upload-file.router");
const upload_inquire_router_1 = require("./upload-inquire.router");
const router = (0, express_1.Router)();
exports.orderRouter = router;
router.get('/check-changes', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), check_changes_router_1.checkChanges);
router.post('/upload-file/:order_id', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), upload_file_router_1.uploadFile);
router.post('/upload-file-for-section', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), upload_file_for_section_router_1.uploadFileForSection);
router.patch('/appoint-expert/:order_id', passport_1.default.authenticate(new admin_strategy_1.AdminStrategy(), { session: false }), appoint_expert_router_1.appointExpert);
router.patch('/change-order-status', passport_1.default.authenticate(new expert_strategy_1.ExpertStrategy(), { session: false }), change_order_status_router_1.changeOrderStatus);
router.patch('/set-attach-opened/:attach_id', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), async (req, res) => res.json(await Attach_model_1.Attach.save(req.body)));
router.patch('/change-section-status/:section_id', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), change_section_status_router_1.changeSectionStatus);
router.get('/no-expert', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), get_orders_without_expert_router_1.getOrdersWithoutExpert);
router.get('/sections-dict/:exp_type/:object_type', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), get_sections_router_1.getSections);
router.get('/attaches-for-section/:section_id', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), get_attaches_for_section_router_1.getAttachesForSection);
router.get('/client', passport_1.default.authenticate(new client_strategy_1.ClientStrategy(), { session: false }), get_orders_for_client_router_1.getOrdersForClient);
router.get('/expert', passport_1.default.authenticate(new expert_strategy_1.ExpertStrategy(), { session: false }), get_orders_for_expert_router_1.getOrdersForExpert);
router.get('/expert-for-order/:order_id', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), get_expert_for_order_router_1.getExpertForOrder);
router.get('/expert/:order_id', passport_1.default.authenticate(new admin_strategy_1.AdminStrategy(), { session: false }), async (req, res) => {
    if (!req.params.order_id)
        return (0, bad_request_error_1.BadRequestError)(res);
    res.json((await Order_model_1.Order.query(`
				SELECT e.id, u.name
				FROM auth.expert e
				JOIN auth.user u on e."userId" = u.id
				JOIN business.order o on o."expertId" = e.id
				WHERE o.id = ${req.params.order_id};
				`))[0]);
});
router.get('/section/:section_id', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), async (req, res) => {
    if (!req.params.section_id) {
        return (0, bad_request_error_1.BadRequestError)(res);
    }
    res.json(await Section_model_1.Section.findOne({
        where: {
            id: parseInt(req.params.section_id),
        },
    }));
});
router.post('/upload-inquire', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), upload_inquire_router_1.uploadInquire);
router.get('/inquire/:order_id', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), get_inquire_router_1.getInquire);
router.get('/sections/:order_id', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), async (req, res) => {
    if (!req.params.order_id) {
        return (0, bad_request_error_1.BadRequestError)(res);
    }
    const sections = await Section_model_1.Section.find({
        where: {
            order: {
                id: parseInt(req.params.order_id),
            },
        },
        order: {
            arrange: 'ASC',
        },
    });
    for await (const section of sections) {
        section.attach = await Attach_model_1.Attach.findBy({
            section: { id: section.id },
        });
    }
    res.json(sections.filter((section) => section.attach.length));
});
router.post('/', passport_1.default.authenticate(new client_strategy_1.ClientStrategy(), { session: false }), add_order_router_1.addOrder);
router.get('/:order_id', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), async (req, res) => {
    if (!req.params.order_id)
        return (0, bad_request_error_1.BadRequestError)(res);
    try {
        res.json((await Order_model_1.Order.query(`SELECT o.id, o.title, o.exp_type, o.object_type, o.status, o."createdAt", 
						c.phone as client_phone, 
						u.name as client_name, u.email as client_email,
						array_to_string(array_agg(distinct(concat(s.arrange, ' ', s.title))), ';') as sections
				FROM business.order o 
				JOIN auth.client c on o."clientId" = c.id
				JOIN auth.user u on u.id = c."userId"
				JOIN business.section s on s."orderId" = o.id
				JOIN business.attach a on a."sectionId" = s.id
				WHERE a.id > 0 AND o.id = ${req.params.order_id}
				GROUP BY o.id, c.id, u.id
				`))[0]);
    }
    catch (_err) {
        const err = _err;
        logger_1.Logger.writeError(err.message);
        res.json({
            error: err.message,
        });
    }
});
router.get('/', passport_1.default.authenticate(new admin_strategy_1.AdminStrategy(), { session: false }), async (req, res) => res.json(await Order_model_1.Order.query(`SELECT o.id, o.title, o.exp_type, o.object_type, o.status, o."createdAt", 
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
				`)));

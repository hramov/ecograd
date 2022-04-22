"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkChanges = void 0;
const Order_model_1 = require("../../../database/model/order/Order.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
async function checkChanges(req, res) {
    const user = req.user;
    const senderId = user.id;
    if (!senderId)
        return (0, bad_request_error_1.BadRequestError)(res);
    const query = `
			SELECT o.id as order_id, s.id as section_id, a.id as attach_id FROM business.order o
			JOIN business.section s ON s."orderId" = o.id
			JOIN business.attach a ON a."sectionId" = s.id
			WHERE a.is_new = true AND a."senderId" <> ${senderId}
		`;
    const result = await Order_model_1.Order.query(query);
    res.json(result);
}
exports.checkChanges = checkChanges;

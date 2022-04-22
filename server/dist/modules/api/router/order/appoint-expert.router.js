"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointExpert = void 0;
const Order_model_1 = require("../../../database/model/order/Order.model");
const Expert_model_1 = require("../../../database/model/user/profiles/Expert.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
const not_found_error_1 = require("../../../error/http/not-found.error");
async function appointExpert(req, res) {
    const order_id = req.params.order_id;
    const expert_id = req.body.expert_id;
    if (!order_id || !expert_id)
        return (0, bad_request_error_1.BadRequestError)(res);
    const order = await Order_model_1.Order.findOneBy({
        id: parseInt(order_id),
        expert: null,
    });
    if (!order) {
        return (0, not_found_error_1.NotFoundError)(res, 'order', 'Cannot find order with id ' +
            order_id +
            ' or the order might already has expert appointed');
    }
    const expert = await Expert_model_1.Expert.findOneBy({ id: parseInt(expert_id) });
    if (!expert) {
        return (0, not_found_error_1.NotFoundError)(res, 'expert', 'Cannot find expert with id ' + expert_id);
    }
    order.expert = expert;
    order.status = 'taken';
    await order.save();
    res.json(order);
}
exports.appointExpert = appointExpert;

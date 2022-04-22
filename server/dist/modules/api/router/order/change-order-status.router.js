"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeOrderStatus = void 0;
const Order_model_1 = require("../../../database/model/order/Order.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
const not_found_error_1 = require("../../../error/http/not-found.error");
async function changeOrderStatus(req, res) {
    const order_id = req.body.order_id;
    const status = req.body.status;
    if (!order_id || !status)
        return (0, bad_request_error_1.BadRequestError)(res);
    const order = await Order_model_1.Order.findOneBy({ id: parseInt(order_id) });
    if (!order) {
        return (0, not_found_error_1.NotFoundError)(res, 'order', 'Cannot find order with id ' + order_id);
    }
    order.status = status;
    await order.save();
    res.json({
        message: 'Successfully updated order with status ' + status,
    });
}
exports.changeOrderStatus = changeOrderStatus;

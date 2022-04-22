"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInquire = void 0;
const Inquire_model_1 = require("../../../database/model/order/Inquire.model");
const Order_model_1 = require("../../../database/model/order/Order.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
const not_found_error_1 = require("../../../error/http/not-found.error");
const logger_1 = require("../../../logger");
async function getInquire(req, res) {
    if (!req.params.order_id)
        return (0, bad_request_error_1.BadRequestError)(res);
    try {
        const order = await Order_model_1.Order.findOneBy({
            id: parseInt(req.params.order_id),
        });
        if (!order) {
            return (0, not_found_error_1.NotFoundError)(res, 'order');
        }
        const inquires = await Inquire_model_1.Inquire.find({
            where: { order: { id: order.id } },
            order: { createdAt: 'DESC' },
        });
        res.json(inquires);
    }
    catch (_err) {
        const err = _err;
        logger_1.Logger.writeError(err.message);
        res.json({
            error: err.message,
        });
    }
}
exports.getInquire = getInquire;

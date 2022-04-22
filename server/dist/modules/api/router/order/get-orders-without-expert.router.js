"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersWithoutExpert = void 0;
const Order_model_1 = require("../../../database/model/order/Order.model");
async function getOrdersWithoutExpert(req, res) {
    return await Order_model_1.Order.findBy({ expert: null });
}
exports.getOrdersWithoutExpert = getOrdersWithoutExpert;

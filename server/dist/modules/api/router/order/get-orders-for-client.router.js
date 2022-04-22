"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersForClient = void 0;
const Attach_model_1 = require("../../../database/model/order/Attach.model");
const Order_model_1 = require("../../../database/model/order/Order.model");
const Section_model_1 = require("../../../database/model/order/Section.model");
async function getOrdersForClient(req, res) {
    const user = req.user;
    const orders = await Order_model_1.Order.findBy({ client: { id: user.id } });
    for (const order of orders) {
        order.sections = await Section_model_1.Section.find({
            where: {
                order: { id: order.id },
            },
            order: { arrange: 'ASC' },
        });
        for (const section of order.sections) {
            section.attach = await Attach_model_1.Attach.findBy({
                section: { id: section.id },
            });
        }
    }
    res.json(orders);
}
exports.getOrdersForClient = getOrdersForClient;

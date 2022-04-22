"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrder = void 0;
const Order_model_1 = require("../../../database/model/order/Order.model");
const Client_model_1 = require("../../../database/model/user/profiles/Client.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
const not_found_error_1 = require("../../../error/http/not-found.error");
async function addOrder(req, res) {
    const user = req.user;
    if (!req.body || !req.body.title) {
        return (0, bad_request_error_1.BadRequestError)(res);
    }
    const client = await Client_model_1.Client.findOneBy({ id: user.id });
    if (!client) {
        return (0, not_found_error_1.NotFoundError)(res, 'client');
    }
    const order = Order_model_1.Order.create({
        title: req.body.title,
        exp_type: req.body.exp_type,
        object_type: req.body.object_type,
        docs_cipher: req.body.docs_cipher,
        rii_cipher: req.body.rii_cipher,
        status: 'new',
        client: client,
        expert: null,
    });
    await order.save();
    res.json(order);
}
exports.addOrder = addOrder;

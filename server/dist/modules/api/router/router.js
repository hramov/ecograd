"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRouter = void 0;
const express_1 = require("express");
const order_router_1 = require("./order/order.router");
const user_router_1 = require("./user/user.router");
class APIRouter {
    router = (0, express_1.Router)();
    init() {
        this.router.use('/user', user_router_1.userRouter);
        this.router.use('/order', order_router_1.orderRouter);
        return this.router;
    }
}
exports.APIRouter = APIRouter;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const sequelize_1 = require("@nestjs/sequelize");
const order_model_1 = require("./models/order.model");
const expert_model_1 = require("../experts/models/expert.model");
const auth_module_1 = require("../auth/auth.module");
const experts_module_1 = require("../experts/experts.module");
const users_module_1 = require("../users/users.module");
const feedback_model_1 = require("./models/feedback.model");
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    common_1.Module({
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService],
        imports: [
            auth_module_1.AuthModule,
            experts_module_1.ExpertsModule,
            users_module_1.UsersModule,
            sequelize_1.SequelizeModule.forFeature([
                order_model_1.Order, expert_model_1.Expert, feedback_model_1.Feedback
            ])
        ]
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map
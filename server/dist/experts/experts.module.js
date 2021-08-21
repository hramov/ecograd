"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpertsModule = void 0;
const common_1 = require("@nestjs/common");
const experts_service_1 = require("./experts.service");
const experts_controller_1 = require("./experts.controller");
const sequelize_1 = require("@nestjs/sequelize");
const expert_model_1 = require("./models/expert.model");
const order_model_1 = require("../orders/models/order.model");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
let ExpertsModule = class ExpertsModule {
};
ExpertsModule = __decorate([
    common_1.Module({
        controllers: [experts_controller_1.ExpertsController],
        providers: [experts_service_1.ExpertsService],
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            sequelize_1.SequelizeModule.forFeature([expert_model_1.Expert, order_model_1.Order])
        ],
        exports: [
            experts_service_1.ExpertsService
        ]
    })
], ExpertsModule);
exports.ExpertsModule = ExpertsModule;
//# sourceMappingURL=experts.module.js.map
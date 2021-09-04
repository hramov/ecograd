"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const experts_module_1 = require("./experts/experts.module");
const orders_module_1 = require("./orders/orders.module");
const roles_module_1 = require("./roles/roles.module");
const auth_module_1 = require("./auth/auth.module");
const user_model_1 = require("./users/models/user.model");
const role_model_1 = require("./roles/models/role.model");
const user_role_model_1 = require("./users/models/user-role.model");
const expert_model_1 = require("./experts/models/expert.model");
const order_model_1 = require("./orders/models/order.model");
const email_module_1 = require("./email/email.module");
const feedback_model_1 = require("./orders/models/feedback.model");
const platform_express_1 = require("@nestjs/platform-express");
const serve_static_1 = require("@nestjs/serve-static");
const posix_1 = require("path/posix");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            orders_module_1.OrdersModule,
            experts_module_1.ExpertsModule,
            auth_module_1.AuthModule,
            platform_express_1.MulterModule.register({
                dest: '@/upload',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: posix_1.join(__dirname, '..', 'uploads'),
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'admin',
                password: 'admin',
                database: 'ecograd',
                models: [user_model_1.User, role_model_1.Role, user_role_model_1.UserRole, expert_model_1.Expert, order_model_1.Order, feedback_model_1.Feedback],
                synchronize: true,
                autoLoadModels: true,
                logging: false,
                timezone: '+07:00',
            }),
            email_module_1.EmailModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
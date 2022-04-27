"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const order_module_1 = require("./order/order.module");
const typeorm_1 = require("@nestjs/typeorm");
const User_model_1 = require("./database/models/user/User.model");
const Admin_model_1 = require("./database/models/user/profiles/Admin.model");
const Client_model_1 = require("./database/models/user/profiles/Client.model");
const Expert_model_1 = require("./database/models/user/profiles/Expert.model");
const Order_model_1 = require("./database/models/order/Order.model");
const Section_model_1 = require("./database/models/order/Section.model");
const Attach_model_1 = require("./database/models/order/Attach.model");
const Feedback_model_1 = require("./database/models/user/Feedback.model");
const Inquire_model_1 = require("./database/models/order/Inquire.model");
const config_1 = require("@nestjs/config");
const index_1 = require("./config/index");
const platform_express_1 = require("@nestjs/platform-express");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'app'),
            }),
            platform_express_1.MulterModule.register({
                dest: 'public',
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [index_1.default],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            order_module_1.OrderModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                synchronize: false,
                logging: ['error'],
                entities: [
                    User_model_1.User,
                    Admin_model_1.Admin,
                    Client_model_1.Client,
                    Expert_model_1.Expert,
                    Order_model_1.Order,
                    Section_model_1.Section,
                    Attach_model_1.Attach,
                    Feedback_model_1.Feedback,
                    Inquire_model_1.Inquire,
                ],
                subscribers: [],
                migrations: [],
            }),
        ],
        controllers: [app_controller_1.AppController],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
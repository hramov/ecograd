"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const typeorm_1 = require("typeorm");
const init_1 = require("./init");
const Attach_model_1 = require("./model/order/Attach.model");
const Inquire_model_1 = require("./model/order/Inquire.model");
const Order_model_1 = require("./model/order/Order.model");
const Section_model_1 = require("./model/order/Section.model");
const Feedback_model_1 = require("./model/user/Feedback.model");
const Admin_model_1 = require("./model/user/profiles/Admin.model");
const Client_model_1 = require("./model/user/profiles/Client.model");
const Expert_model_1 = require("./model/user/profiles/Expert.model");
const User_model_1 = require("./model/user/User.model");
class Database {
    async init() {
        try {
            const appDataSource = new typeorm_1.DataSource({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                synchronize: true,
                logging: true,
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
            });
            await appDataSource.initialize();
            await init_1.DatabaseIniter.initUser();
        }
        catch (_err) {
            const err = _err;
            console.log(err.message);
        }
    }
}
exports.Database = Database;

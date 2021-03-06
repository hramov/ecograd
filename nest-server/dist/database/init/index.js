"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseIniter = void 0;
const bcrypt_1 = require("bcrypt");
const logger_1 = require("../../logger");
const Admin_model_1 = require("../models/user/profiles/Admin.model");
const User_model_1 = require("../models/user/User.model");
class DatabaseIniter {
    static async initUser() {
        if ((await User_model_1.User.find()).length) {
            return;
        }
        const user = User_model_1.User.create({
            name: 'Администратор',
            email: 'admin@ecograd.ru',
            password: (0, bcrypt_1.hashSync)('admin', 10),
            profile: 'Администратор',
        });
        await user.save();
        logger_1.Logger.writeInfo('Successfully initialized user admin@ecograd.ru');
        const admin = Admin_model_1.Admin.create({
            user,
        });
        await admin.save();
        logger_1.Logger.writeInfo('Successfully initialized profile Admin');
    }
}
exports.DatabaseIniter = DatabaseIniter;
//# sourceMappingURL=index.js.map
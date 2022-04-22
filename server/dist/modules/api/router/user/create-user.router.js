"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcrypt_1 = require("bcrypt");
const config_1 = require("../../../../auth/config");
const Admin_model_1 = require("../../../database/model/user/profiles/Admin.model");
const Client_model_1 = require("../../../database/model/user/profiles/Client.model");
const Expert_model_1 = require("../../../database/model/user/profiles/Expert.model");
const User_model_1 = require("../../../database/model/user/User.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
async function createUser(req, res) {
    const user = req.body.user;
    const profile = req.body.profile;
    if (!req.body.user.name || !req.body.profile)
        return (0, bad_request_error_1.BadRequestError)(res);
    const result = User_model_1.User.create({
        name: user.name,
        email: user.email,
        password: (0, bcrypt_1.hashSync)(user.password, 10),
        profile: user.profile,
    });
    const savedUser = await result.save();
    let error = null;
    switch (user.profile) {
        case config_1.ROLES.Admin:
            const admin = Admin_model_1.Admin.create({
                user: savedUser,
            });
            await admin.save();
            break;
        case config_1.ROLES.Expert:
            const expert = Expert_model_1.Expert.create({
                certificate: profile.certificate,
                direction: profile.direction,
                misc: profile.misc,
                position: profile.position,
                phone: profile.phone,
                user: savedUser,
            });
            await expert.save();
            break;
        case config_1.ROLES.Client:
            const client = Client_model_1.Client.create({
                phone: profile.phone,
                user: savedUser,
            });
            await client.save();
            break;
        default:
            error = new Error('Профиль не опознан');
    }
    if (res) {
        res.json(error ? error : result);
    }
    else {
        return error ? error : result;
    }
}
exports.createUser = createUser;

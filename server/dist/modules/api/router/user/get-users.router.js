"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const config_1 = require("../../../../auth/config");
const Admin_model_1 = require("../../../database/model/user/profiles/Admin.model");
const Client_model_1 = require("../../../database/model/user/profiles/Client.model");
const Expert_model_1 = require("../../../database/model/user/profiles/Expert.model");
async function getUsers(req, res) {
    if (req.query.profile) {
        const profile = req.query.profile;
        switch (profile) {
            case config_1.ROLES.Admin:
                return res.json(await Admin_model_1.Admin.find({
                    relations: ['user'],
                }));
            case config_1.ROLES.Client:
                return res.json(await Client_model_1.Client.find({
                    relations: ['user'],
                }));
            case config_1.ROLES.Expert:
                return res.json(await Expert_model_1.Expert.find({
                    relations: ['user'],
                }));
        }
    }
    res.json({
        admin: await Admin_model_1.Admin.find({ relations: ['user'] }),
        expert: await Expert_model_1.Expert.find({ relations: ['user'] }),
        client: await Client_model_1.Client.find({ relations: ['user'] }),
    });
}
exports.getUsers = getUsers;

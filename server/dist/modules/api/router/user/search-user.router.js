"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUser = void 0;
const User_model_1 = require("../../../database/model/user/User.model");
async function searchUser(req, res) {
    res.json(await User_model_1.User.findBy(req.body));
}
exports.searchUser = searchUser;

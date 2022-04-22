"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const User_model_1 = require("../../../database/model/user/User.model");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
async function deleteUser(req, res) {
    if (!req.params.id)
        return (0, bad_request_error_1.BadRequestError)(res);
    res.json(await User_model_1.User.delete(parseInt(req.params.id)));
}
exports.deleteUser = deleteUser;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function login(req, res) {
    const user = req.user;
    res.json({
        access_token: (0, jsonwebtoken_1.sign)({ sub: user.id, email: user.email, profile: user.profile }, 'secret'),
    });
}
exports.login = login;

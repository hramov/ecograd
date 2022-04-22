"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
async function getUserInfo(req, res) {
    res.json(req.user);
}
exports.getUserInfo = getUserInfo;

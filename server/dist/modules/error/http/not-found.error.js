"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
async function NotFoundError(res, entity, message) {
    res.status(404).json({
        status: false,
        data: null,
        error: message ? message : `${entity} not found`,
    });
}
exports.NotFoundError = NotFoundError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
function BadRequestError(res) {
    res.status(400).json({
        status: false,
        data: null,
        error: 'Bad request',
    });
}
exports.BadRequestError = BadRequestError;

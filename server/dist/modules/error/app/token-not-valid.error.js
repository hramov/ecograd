"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenNotValidError = void 0;
class TokenNotValidError extends Error {
    constructor() {
        super('Token not valid');
    }
}
exports.TokenNotValidError = TokenNotValidError;

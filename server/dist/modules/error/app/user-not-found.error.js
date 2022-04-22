"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
class UserNotFoundError extends Error {
    email;
    constructor(email) {
        super('User not found');
        this.email = email;
    }
}
exports.UserNotFoundError = UserNotFoundError;

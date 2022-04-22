"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    field;
    constructor(field) {
        super('Validation error');
        this.field = field;
    }
}
exports.ValidationError = ValidationError;

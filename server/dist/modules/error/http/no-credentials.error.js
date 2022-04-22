"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoCredentialsError = void 0;
async function NoCredentialsError(res) {
    res.status(401).json({
        status: false,
        data: null,
        error: 'No credentials passed',
    });
}
exports.NoCredentialsError = NoCredentialsError;

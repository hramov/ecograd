"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerProblemsException = void 0;
const common_1 = require("@nestjs/common");
class InnerProblemsException extends common_1.HttpException {
    constructor(response) {
        super(response, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        this.messages = response;
    }
}
exports.InnerProblemsException = InnerProblemsException;
//# sourceMappingURL=inner-problems.exception.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueResponseException = void 0;
const common_1 = require("@nestjs/common");
class VueResponseException extends common_1.HttpException {
    constructor(response) {
        super(response, common_1.HttpStatus.OK);
    }
}
exports.VueResponseException = VueResponseException;
//# sourceMappingURL=vue-response.exception.js.map
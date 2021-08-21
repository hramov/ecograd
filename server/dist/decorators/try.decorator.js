"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Try = void 0;
const common_1 = require("@nestjs/common");
function Try(target, propertyName, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        try {
            return await originalMethod.apply(this, args);
        }
        catch (err) {
            if (err.sql)
                throw new common_1.BadRequestException(err.original.toString());
            throw new common_1.InternalServerErrorException(err.original.toString());
        }
    };
}
exports.Try = Try;
//# sourceMappingURL=try.decorator.js.map
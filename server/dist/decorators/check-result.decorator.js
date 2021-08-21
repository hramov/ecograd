"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckResult = void 0;
const common_1 = require("@nestjs/common");
function CheckResult(target, propertyName, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        const result = await originalMethod.apply(this, args);
        if (result && result[0] != 0) {
            return await this.findOne(args['id']);
        }
        throw new common_1.BadRequestException('Cannot update order');
    };
}
exports.CheckResult = CheckResult;
//# sourceMappingURL=check-result.decorator.js.map
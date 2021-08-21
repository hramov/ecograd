"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = exports.USER_ID = void 0;
const common_1 = require("@nestjs/common");
exports.USER_ID = 'userid';
const UserId = (userid) => common_1.SetMetadata(exports.USER_ID, userid);
exports.UserId = UserId;
//# sourceMappingURL=allow-request.decorator.js.map
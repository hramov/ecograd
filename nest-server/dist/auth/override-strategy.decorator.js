"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverrideGlobalStrategy = exports.OVERRIDE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.OVERRIDE_KEY = 'override-global-strategy';
const OverrideGlobalStrategy = () => (0, common_1.SetMetadata)(exports.OVERRIDE_KEY, true);
exports.OverrideGlobalStrategy = OverrideGlobalStrategy;
//# sourceMappingURL=override-strategy.decorator.js.map
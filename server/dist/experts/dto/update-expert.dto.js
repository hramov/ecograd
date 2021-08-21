"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExpertDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_expert_dto_1 = require("./create-expert.dto");
class UpdateExpertDto extends mapped_types_1.PartialType(create_expert_dto_1.CreateExpertDto) {
}
exports.UpdateExpertDto = UpdateExpertDto;
//# sourceMappingURL=update-expert.dto.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpertsController = void 0;
const common_1 = require("@nestjs/common");
const experts_service_1 = require("./experts.service");
const create_expert_dto_1 = require("./dto/create-expert.dto");
const update_expert_dto_1 = require("./dto/update-expert.dto");
const roles_enum_1 = require("../auth/roles-enum");
const roles_guard_1 = require("../auth/roles.guard");
const roles_auth_decorator_1 = require("../auth/roles-auth.decorator");
let ExpertsController = class ExpertsController {
    constructor(expertsService) {
        this.expertsService = expertsService;
    }
    async create(createExpertDto) {
        return await this.expertsService.create(createExpertDto);
    }
    async findAll() {
        return await this.expertsService.findAll();
    }
    async findOne(id) {
        return await this.expertsService.findOne(id);
    }
    async update(id, updateExpertDto) {
        return await this.expertsService.update(id, updateExpertDto);
    }
    async remove(id) {
        return await this.expertsService.remove(id);
    }
    async assignExpert(id, userid) {
        return await this.expertsService.assignToExpert(id, userid);
    }
};
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expert_dto_1.CreateExpertDto]),
    __metadata("design:returntype", Promise)
], ExpertsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExpertsController.prototype, "findAll", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Expert),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExpertsController.prototype, "findOne", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Expert),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_expert_dto_1.UpdateExpertDto]),
    __metadata("design:returntype", Promise)
], ExpertsController.prototype, "update", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExpertsController.prototype, "remove", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Expert),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Patch('new/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ExpertsController.prototype, "assignExpert", null);
ExpertsController = __decorate([
    common_1.Controller('experts'),
    __metadata("design:paramtypes", [experts_service_1.ExpertsService])
], ExpertsController);
exports.ExpertsController = ExpertsController;
//# sourceMappingURL=experts.controller.js.map
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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const override_strategy_decorator_1 = require("../auth/override-strategy.decorator");
const roles_1 = require("../auth/roles");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_feedback_dto_1 = require("./dto/create-feedback.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getProfiles() {
        return this.userService.getProfiles();
    }
    async getExperts() {
        return await this.userService.getExperts();
    }
    async createFeedback(createFeedbackDto) {
        return await this.userService.createFeedback(createFeedbackDto);
    }
    async deleteUser(id) {
        return await this.userService.deleteUser(id);
    }
    async createUser(createUserDto, profileDto) {
        return await this.userService.createUser(createUserDto, profileDto);
    }
    async getUsers() {
        return await this.userService.getUsers();
    }
};
__decorate([
    (0, common_1.Get)('profile'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfiles", null);
__decorate([
    (0, common_1.Get)('expert'),
    (0, override_strategy_decorator_1.OverrideGlobalStrategy)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getExperts", null);
__decorate([
    (0, common_1.Post)('feedback'),
    (0, override_strategy_decorator_1.OverrideGlobalStrategy)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feedback_dto_1.CreateFeedbackDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createFeedback", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Admin),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Admin),
    __param(0, (0, common_1.Body)('user')),
    __param(1, (0, common_1.Body)('profile')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
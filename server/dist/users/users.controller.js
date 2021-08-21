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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const roles_auth_decorator_1 = require("../auth/roles-auth.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const roles_enum_1 = require("../auth/roles-enum");
const add_role_dto_1 = require("./dto/add-role.dto");
const jwt_access_guard_1 = require("../auth/jwt-access.guard");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        return await this.usersService.create(createUserDto);
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    async findUsersForExperts() {
        return await this.usersService.findUsersForExperts();
    }
    async findUExperts() {
        return await this.usersService.findUExperts();
    }
    async addRole(dto) {
        return await this.usersService.addRole(dto);
    }
    async removeRole(dto) {
        return await this.usersService.removeRole(dto);
    }
    async findOne(req, id) {
        return await this.usersService.findOne(id);
    }
    async update(req, id, updateUserDto) {
        return await this.usersService.update(id, updateUserDto);
    }
    async remove(req, id) {
        return await this.usersService.remove(id);
    }
    async appendImage(id, file) {
        return await this.usersService.appendImage(id, file[0]);
    }
};
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Get('expert'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUsersForExperts", null);
__decorate([
    common_1.Get('uexpert'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUExperts", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Post('/add-role'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_role_dto_1.AddRoleDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addRole", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Post('/remove-role'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_role_dto_1.AddRoleDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeRole", null);
__decorate([
    common_1.UseGuards(jwt_access_guard_1.JwtAccessGuard),
    common_1.Get(':id'),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_access_guard_1.JwtAccessGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_access_guard_1.JwtAccessGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Patch('image/:id'),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.Param('id')),
    __param(1, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "appendImage", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map
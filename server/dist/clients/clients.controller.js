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
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const roles_auth_decorator_1 = require("../auth/roles-auth.decorator");
const roles_enum_1 = require("../auth/roles-enum");
const roles_guard_1 = require("../auth/roles.guard");
const clients_service_1 = require("./clients.service");
const create_client_dto_1 = require("./dto/create-client.dto");
const update_client_dto_1 = require("./dto/update-client.dto");
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async create(createClientDto) {
        return await this.clientsService.create(createClientDto);
    }
    async findAll() {
        return await this.clientsService.findAll();
    }
    async findOne(id) {
        return await this.clientsService.findOne(id);
    }
    async update(id, updateClientDto) {
        return await this.clientsService.update(id, updateClientDto);
    }
    async remove(id) {
        return await this.clientsService.remove(id);
    }
    async assignToClient(id, userid) {
        return await this.clientsService.assignToClient(id, userid);
    }
};
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "create", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findAll", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Client),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "findOne", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Client),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "update", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "remove", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Client),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Patch('new/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "assignToClient", null);
ClientsController = __decorate([
    common_1.Controller('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
exports.ClientsController = ClientsController;
//# sourceMappingURL=clients.controller.js.map
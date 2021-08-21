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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const roles_guard_1 = require("../auth/roles.guard");
const roles_auth_decorator_1 = require("../auth/roles-auth.decorator");
const roles_enum_1 = require("../auth/roles-enum");
const create_order_unauthorized_dto_1 = require("./dto/create-order-unauthorized.dto");
const platform_express_1 = require("@nestjs/platform-express");
const try_decorator_1 = require("../decorators/try.decorator");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(createOrderDto) {
        return await this.ordersService.create(createOrderDto);
    }
    async createOrderUnauthorized(orderDto) {
        return await this.ordersService.createOrderUnauthorized(orderDto);
    }
    async findAll() {
        return await this.ordersService.findAll();
    }
    async findOne(id) {
        return await this.ordersService.findOne(id);
    }
    async findByClientId(clientid) {
        return await this.ordersService.findByClientId(clientid);
    }
    async update(id, updateOrderDto) {
        return await this.ordersService.update(id, updateOrderDto);
    }
    async remove(id) {
        return await this.ordersService.remove(id);
    }
    async addExpert(id, expertid) {
        return await this.ordersService.addExpert(id, expertid);
    }
    async uploadDocs(id, files) {
        return await this.ordersService.uploadDocs(id, files);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    common_1.Post('/unauthorized'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_unauthorized_dto_1.CreateOrderUnauthorizedDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrderUnauthorized", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Expert),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Expert, roles_enum_1.RolesEnum.Client),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Expert, roles_enum_1.RolesEnum.Client),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Get('client/:clientid'),
    __param(0, common_1.Param('clientid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findByClientId", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Expert, roles_enum_1.RolesEnum.Client),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Expert),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Patch('expert/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('expertid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addExpert", null);
__decorate([
    roles_auth_decorator_1.Roles(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.Expert, roles_enum_1.RolesEnum.Client),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.Patch('upload/:id'),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.Param('id')),
    __param(1, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "uploadDocs", null);
OrdersController = __decorate([
    common_1.Controller('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map
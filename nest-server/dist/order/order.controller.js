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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const user_decorator_1 = require("../auth/decorator/user.decorator");
const roles_1 = require("../auth/roles");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const edit_filename_1 = require("../utils/edit-filename");
const attach_dto_1 = require("./dto/attach.dto");
const change_order_status_dto_1 = require("./dto/change-order-status.dto");
const create_order_dto_1 = require("./dto/create-order.dto");
const upload_file_dto_1 = require("./dto/upload-file.dto");
const upload_inquire_dto_1 = require("./dto/upload-inquire.dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async checkChanges(user) {
        return await this.orderService.checkChanges(user.id);
    }
    async uploadFile(user, order_id, uploadFileDto, files) {
        return await this.orderService.uploadFile(uploadFileDto, files, order_id, user);
    }
    async uploadFileForSection(user, order_id, uploadFileForSectionDto, files) {
        return await this.orderService.uploadFileForSection(user, files, uploadFileForSectionDto);
    }
    async appointExpert(order_id, expert_id) {
        return await this.orderService.appointExpert(order_id, expert_id);
    }
    async changeOrderStatus(dto) {
        return await this.orderService.changeOrderStatus(dto);
    }
    async setAttachOpened(dto) {
        return await this.orderService.setAttachOpened(dto);
    }
    async changeSectionStatus(section_id, new_status) {
        return await this.orderService.changeSectionStatus(section_id, new_status);
    }
    async getOrdersWithoutExpert() {
        return await this.orderService.getOrdersWithoutExpert();
    }
    async getSections(exp_type, object_type) {
        return await this.orderService.getSections(exp_type, object_type);
    }
    async getAttachesForSection(user, section_id) {
        return await this.orderService.getAttachesForSection(user.id, section_id);
    }
    async getOrdersForClient(user) {
        return await this.orderService.getOrdersForClient(user.id);
    }
    async getAppointmentExpert(order_id) {
        return await this.orderService.appointmentExpert(order_id);
    }
    async getOrdersForExpert(user) {
        return await this.orderService.getOrdersForExpert(user.id);
    }
    async getExpertForOrder(order_id) {
        return await this.orderService.getExpertForOrder(order_id);
    }
    async getSection(section_id) {
        return await this.orderService.getSectionByID(section_id);
    }
    async uploadInquire(user, dto, order_id, files) {
        return await this.orderService.uploadInquire(user, dto, files);
    }
    async getInquire(order_id) {
        return await this.orderService.getInquire(order_id);
    }
    async getSectionsForOrder(order_id) {
        return await this.orderService.getSectionsForOrder(order_id);
    }
    async addOrder(user, dto) {
        return await this.orderService.addOrder(user.id, dto);
    }
    async getOrder(order_id) {
        return await this.orderService.getOrderByID(order_id);
    }
    async getOrders() {
        return await this.orderService.getOrders();
    }
};
__decorate([
    (0, common_1.Get)('/check-changes'),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "checkChanges", null);
__decorate([
    (0, common_1.Post)('/upload-file/:order_id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: edit_filename_1.getFolderName,
            filename: edit_filename_1.editFileName,
        }),
    })),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('order_id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Number, upload_file_dto_1.UploadFileDto,
        Array]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('/upload-file-for-section/:order_id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: edit_filename_1.getFolderName,
            filename: edit_filename_1.editFileName,
        }),
    })),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('order_id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Number, upload_file_dto_1.UploadFileForSectionDto,
        Array]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "uploadFileForSection", null);
__decorate([
    (0, common_1.Put)('/appoint-expert/:order_id'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Admin),
    __param(0, (0, common_1.Param)('order_id')),
    __param(1, (0, common_1.Body)('expert_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "appointExpert", null);
__decorate([
    (0, common_1.Put)('/change-order-status'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_order_status_dto_1.ChangeOrderStatusDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "changeOrderStatus", null);
__decorate([
    (0, common_1.Put)('/set-attach-opened/:attach_id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attach_dto_1.AttachDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "setAttachOpened", null);
__decorate([
    (0, common_1.Put)('/change-section-status/:section_id'),
    __param(0, (0, common_1.Param)('section_id')),
    __param(1, (0, common_1.Body)('new_status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "changeSectionStatus", null);
__decorate([
    (0, common_1.Get)('/no-expert'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrdersWithoutExpert", null);
__decorate([
    (0, common_1.Get)('/sections-dict/:exp_type/:object_type'),
    __param(0, (0, common_1.Param)('exp_type')),
    __param(1, (0, common_1.Param)('object_type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getSections", null);
__decorate([
    (0, common_1.Get)('/attaches-for-section/:section_id'),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('section_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAttachesForSection", null);
__decorate([
    (0, common_1.Get)('/client'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Client),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrdersForClient", null);
__decorate([
    (0, common_1.Get)('/expert/:order_id'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Admin),
    __param(0, (0, common_1.Param)('order_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAppointmentExpert", null);
__decorate([
    (0, common_1.Get)('/expert'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Expert),
    __param(0, (0, user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrdersForExpert", null);
__decorate([
    (0, common_1.Get)('/expert-for-order/:order_id'),
    __param(0, (0, common_1.Param)('order_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getExpertForOrder", null);
__decorate([
    (0, common_1.Get)('/section/:section_id'),
    __param(0, (0, common_1.Param)('section_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getSection", null);
__decorate([
    (0, common_1.Post)('/upload-inquire/:order_id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: edit_filename_1.getInquireFolderName,
            filename: edit_filename_1.editFileName,
        }),
    })),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('order_id')),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto,
        upload_inquire_dto_1.UploadInquireDto, Number, Array]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "uploadInquire", null);
__decorate([
    (0, common_1.Get)('/inquire/:order_id'),
    __param(0, (0, common_1.Param)('order_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getInquire", null);
__decorate([
    (0, common_1.Get)('/sections/:order_id'),
    __param(0, (0, common_1.Param)('order_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getSectionsForOrder", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Client),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto,
        create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addOrder", null);
__decorate([
    (0, common_1.Get)('/:order_id'),
    __param(0, (0, common_1.Param)('order_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, roles_decorator_1.Roles)(roles_1.ROLES.Admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map
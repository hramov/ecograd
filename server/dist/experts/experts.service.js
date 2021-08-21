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
exports.ExpertsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_service_1 = require("../users/users.service");
const expert_model_1 = require("./models/expert.model");
let ExpertsService = class ExpertsService {
    constructor(expertRepository, userService) {
        this.expertRepository = expertRepository;
        this.userService = userService;
    }
    async create(createExpertDto) {
        const user = await this.userService.findOne(createExpertDto.userid);
        const expert = await this.expertRepository.create(createExpertDto);
        expert.user = user;
        expert.save();
        return expert;
    }
    async findAll() {
        return await this.expertRepository.findAll({ include: { all: true } });
    }
    async findOne(id) {
        return await this.expertRepository.findByPk(id, { include: { all: true } });
    }
    async update(id, updateExpertDto) {
        const result = await this.expertRepository.update(updateExpertDto, {
            where: { id },
        });
        if (result && result[0] > 0)
            return this.findOne(id);
        throw new common_1.BadRequestException('Cannot update expert');
    }
    async remove(id) {
        const expert = await this.findOne(id);
        const result = await this.expertRepository.destroy({ where: { id } });
        if (result && result > 0)
            return expert;
        throw new common_1.BadRequestException('Cannot delete user');
    }
    async assignToExpert(id, userid) {
        const user = await this.userService.findOne(userid);
        const expert = await this.findOne(id);
        if (user && expert) {
            if (user.expert)
                throw new common_1.BadRequestException('User is already assign to expert');
            await expert.$set('user', userid);
            expert.user = user;
            return expert;
        }
    }
};
ExpertsService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(expert_model_1.Expert)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService])
], ExpertsService);
exports.ExpertsService = ExpertsService;
//# sourceMappingURL=experts.service.js.map
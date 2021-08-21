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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_service_1 = require("../users/users.service");
const client_model_1 = require("./models/client.model");
let ClientsService = class ClientsService {
    constructor(clientRepository, userService) {
        this.clientRepository = clientRepository;
        this.userService = userService;
    }
    async create(createClientDto) {
        return await this.clientRepository.create(createClientDto);
    }
    async findAll() {
        return await this.clientRepository.findAll({ include: { all: true } });
    }
    async findOne(id) {
        return await this.clientRepository.findByPk(id, { include: { all: true } });
    }
    async findByUserId(id) {
        return await this.clientRepository.findOne({
            where: { userid: id },
            include: { all: true },
        });
    }
    async update(id, updateClientDto) {
        const result = await this.clientRepository.update(updateClientDto, {
            where: { id },
        });
        if (result && result[0] != 0)
            return await this.findOne(id);
        throw new common_1.BadRequestException('Cannot update client');
    }
    async remove(id) {
        const user = await this.findOne(id);
        const result = await this.clientRepository.destroy({ where: { id } });
        if (result && result != 0)
            return user;
        throw new common_1.BadRequestException('Cannot remove client');
    }
    async assignToClient(id, userid) {
        const client = await this.findOne(id);
        const user = await this.userService.findOne(userid);
        if (user && client) {
            if (user.client)
                throw new common_1.BadRequestException('This user is already assigned to client');
            await client.$set('user', userid);
            client.user = user;
            return client;
        }
    }
};
ClientsService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(client_model_1.Client)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService])
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map
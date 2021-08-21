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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const auth_service_1 = require("../auth/auth.service");
const roles_enum_1 = require("../auth/roles-enum");
const experts_service_1 = require("../experts/experts.service");
const users_service_1 = require("../users/users.service");
const order_model_1 = require("./models/order.model");
const archiver_1 = __importDefault(require("archiver"));
const fs_1 = require("fs");
let OrdersService = class OrdersService {
    constructor(orderRepository, expertService, userService, authService) {
        this.orderRepository = orderRepository;
        this.expertService = expertService;
        this.userService = userService;
        this.authService = authService;
    }
    async create(createOrderDto) {
        const user = await this.userService.findOne(createOrderDto.userid);
        if (user && user.roles.some((role) => role.id === 3 || role.id === 1)) {
            const order = await this.orderRepository.create(createOrderDto);
            order.$set('client', user.id);
            order.client = user;
            return order;
        }
        return `You should be a client to make orders`;
    }
    async createOrderUnauthorized(orderDto) {
        try {
            const userData = {
                name: orderDto.name.split(' ')[0],
                phone: orderDto.phone,
                birth_date: new Date('1970-01-01'),
                email: orderDto.email,
                password: Date.now().toString(),
            };
            const orderData = {
                object: orderDto.object,
                object_type: orderDto.object_type,
            };
            let user = (await this.authService.register(userData)).user;
            if (!user)
                console.log('Cannot create user');
            user = await this.userService.addRole({
                roleid: roles_enum_1.RolesEnum.Client,
                userid: user.id,
            });
            if (user && user.roles.some((role) => role.id === 3 || role.id === 1)) {
                const order = await this.orderRepository.create(orderData);
                if (!order)
                    console.log('Cannot create order');
                order.$set('client', user.id);
                order.client = user;
                user.password = userData.password;
                return {
                    order: order,
                    user: user,
                };
            }
        }
        catch (err) {
            console.log(err);
        }
        return `Something went wrong`;
    }
    async findAll() {
        return await this.orderRepository.findAll({ include: { all: true } });
    }
    async findOne(id) {
        return await this.orderRepository.findByPk(id, { include: { all: true } });
    }
    async update(id, updateOrderDto) {
        const result = await this.orderRepository.update(updateOrderDto, {
            where: { id },
        });
        if (result && result[0] != 0) {
            return await this.findOne(id);
        }
        throw new common_1.BadRequestException('Cannot update order');
    }
    async remove(id) {
        const order = await this.findOne(id);
        if (order) {
            const result = await this.orderRepository.destroy({ where: { id } });
            if (result == 0)
                throw new common_1.BadRequestException('Cannot remove the order');
            return order;
        }
        throw new common_1.NotFoundException('Cannot find the order to delete');
    }
    async addExpert(id, expertid) {
        const order = await this.findOne(id);
        if (order.expert)
            return 'Order already has an expert';
        order.$set('expert', expertid);
        return order;
    }
    async findByClientId(clientid) {
        return await this.orderRepository.findAll({
            where: { clientid: clientid },
        });
    }
    async uploadDocs(id, files) {
        const order = await this.findOne(id);
        const path = `uploads/orders/${id}_${Date.now().toString()}.zip`;
        const url = `orders/${id}_${Date.now().toString()}.zip`;
        const output = fs_1.createWriteStream(path);
        const archive = archiver_1.default('zip', {
            zlib: { level: 9 },
        });
        archive.pipe(output);
        for (let i = 0; i < files.length; i++) {
            archive.append(files[i].buffer, { name: files[i].originalname });
        }
        archive.finalize();
        order.docs_url = url;
        order.save();
        return true;
    }
};
OrdersService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(order_model_1.Order)),
    __metadata("design:paramtypes", [Object, experts_service_1.ExpertsService,
        users_service_1.UsersService,
        auth_service_1.AuthService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map
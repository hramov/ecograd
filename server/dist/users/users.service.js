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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const roles_service_1 = require("../roles/roles.service");
const bcryptjs_1 = require("bcryptjs");
const user_role_model_1 = require("./models/user-role.model");
const sequelize_2 = require("sequelize");
const roles_enum_1 = require("../auth/roles-enum");
const fs_1 = require("fs");
let UsersService = UsersService_1 = class UsersService {
    constructor(userRepository, userRoleRepository, rolesService) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.rolesService = rolesService;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async create(createUserDto) {
        if (await this.findByEmail(createUserDto.email))
            throw new common_1.BadRequestException('This email is already registered');
        if (await this.findByPhone(createUserDto.phone))
            throw new common_1.BadRequestException('This phone number is already registerded');
        const user = await this.userRepository.create(createUserDto);
        user.roles = [];
        return user;
    }
    async findAll() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        if (users.length == 0)
            throw new common_1.NotFoundException('User not found');
        return users;
    }
    async findOne(id) {
        const user = await this.userRepository.findByPk(id, {
            include: { all: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async findByEmail(email) {
        return await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
    }
    async findByPhone(phone) {
        return await this.userRepository.findOne({
            where: { phone },
            include: { all: true },
        });
    }
    async update(id, updateUserDto) {
        let result;
        if (updateUserDto.password) {
            result = await this.userRepository.update(Object.assign(Object.assign({}, updateUserDto), { password: await bcryptjs_1.hash(updateUserDto.password, 5) }), { where: { id } });
        }
        result = await this.userRepository.update(updateUserDto, {
            where: { id },
        });
        if (result && result[0] > 0)
            return await this.findOne(id);
        throw new common_1.BadRequestException('Cannot update user');
    }
    async remove(id) {
        const user = await this.findOne(id);
        const result = await this.userRepository.destroy({ where: { id } });
        if (result && result > 0)
            return user;
        throw new common_1.BadRequestException('Cannot remove user');
    }
    async addRole(dto) {
        const user = await this.findOne(dto.userid);
        const role = await this.rolesService.findOne(dto.roleid);
        if (role && user) {
            if (user.roles.some((r) => r.id == role.id)) {
                console.log('User already has this role');
                return;
            }
            await user.$add('role', role.id);
            user.roles.push(role);
            return user;
        }
        throw new common_1.HttpException('User or role not found', common_1.HttpStatus.NOT_FOUND);
    }
    async removeRole(dto) {
        const user = await this.findOne(dto.userid);
        const role = await this.rolesService.findOne(dto.roleid);
        if (role && user) {
            if (user.roles.some((r) => r.id == role.id)) {
                await user.$remove('role', role.id);
                return user.roles.filter((r) => r.id != role.id);
            }
            return 'User does not has this role';
        }
        return 'User or role not found';
    }
    async findUsersForExperts() {
        var e_1, _a;
        const ids = await this.userRoleRepository.findAll({
            where: { roleid: { [sequelize_2.Op.ne]: roles_enum_1.RolesEnum.Client } },
        });
        const users = [];
        try {
            for (var ids_1 = __asyncValues(ids), ids_1_1; ids_1_1 = await ids_1.next(), !ids_1_1.done;) {
                const id = ids_1_1.value;
                const user = await this.userRepository.findByPk(id.userid, {
                    include: { all: true },
                });
                if (!users.includes(user))
                    users.push(user);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) await _a.call(ids_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return users;
    }
    async findUExperts() {
        var e_2, _a;
        const ids = await this.userRoleRepository.findAll({
            where: { roleid: roles_enum_1.RolesEnum.Expert },
        });
        const users = [];
        try {
            for (var ids_2 = __asyncValues(ids), ids_2_1; ids_2_1 = await ids_2.next(), !ids_2_1.done;) {
                const id = ids_2_1.value;
                const user = await this.userRepository.findByPk(id.userid, {
                    include: { all: true },
                });
                users.push(user);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (ids_2_1 && !ids_2_1.done && (_a = ids_2.return)) await _a.call(ids_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return users;
    }
    async appendImage(id, file) {
        if (!file)
            return "No file";
        const user = await this.findOne(id);
        const path = `uploads/users/img/user_${id}.${file.mimetype.toString().split('/')[1]}`;
        const url = `users/img/user_${id}.${file.mimetype.split('/')[1]}`;
        fs_1.writeFileSync(path, file.buffer);
        user.image_url = url;
        user.save();
        return user;
    }
};
UsersService = UsersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(user_model_1.User)),
    __param(1, sequelize_1.InjectModel(user_role_model_1.UserRole)),
    __metadata("design:paramtypes", [Object, Object, roles_service_1.RolesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
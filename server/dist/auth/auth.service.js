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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const login_user_dto_1 = require("../users/dto/login-user.dto");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = require("../users/models/user.model");
const roles_enum_1 = require("./roles-enum");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(userLoginDto) {
        const user = await this.validateUser(userLoginDto);
        return {
            status: true,
            jwt_token: this.generateToken(user),
            user: user,
        };
    }
    async register(createUserDto) {
        const candidate = await this.userService.findByEmail(createUserDto.email);
        if (candidate) {
            throw new common_1.BadRequestException('This email has already been registered!');
        }
        const hashedPassword = await bcryptjs_1.hash(createUserDto.password, 5);
        let user = await this.userService.create(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword, birth_date: new Date(createUserDto.birth_date) }));
        return {
            user: user,
            token: this.generateToken(user),
        };
    }
    generateToken(user) {
        const payload = {
            email: user.email,
            id: user.id,
            roles: user.roles,
        };
        return this.jwtService.sign(payload);
    }
    async validateUser(userDto) {
        const user = await this.userService.findByEmail(userDto.email);
        if (user) {
            const passwordEquals = await bcryptjs_1.compare(userDto.password, user.password);
            if (passwordEquals)
                return user;
        }
        throw new common_1.UnauthorizedException('Incorrect credentials');
    }
    validateJwt(jwt_token) {
        try {
            const user = this.jwtService.verify(jwt_token);
            const admin = user.roles.some((role) => role.id == roles_enum_1.RolesEnum.Admin);
            if (admin) {
                return true;
            }
            return false;
        }
        catch (err) {
            throw new common_1.BadRequestException('JWT is not valid!');
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
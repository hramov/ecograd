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
exports.ClientStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const User_model_1 = require("../../database/models/user/User.model");
const roles_1 = require("../roles");
let ClientStrategy = class ClientStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'client') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: 'secret',
        });
    }
    async validate(jwt_payload) {
        if (!jwt_payload.sub)
            return new Error('Token not valid');
        const user = await User_model_1.User.findOne({ where: { id: jwt_payload.sub } });
        if (!user || user.profile !== roles_1.ROLES.Client) {
            return null;
        }
        return user;
    }
};
ClientStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ClientStrategy);
exports.ClientStrategy = ClientStrategy;
//# sourceMappingURL=client.strategy.js.map
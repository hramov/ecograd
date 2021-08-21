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
exports.AllowRequest = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const role_model_1 = require("../roles/models/role.model");
const allow_request_decorator_1 = require("./allow-request.decorator");
let AllowRequest = class AllowRequest {
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    canActivate(context) {
        try {
            const requiredId = this.reflector.getAllAndOverride(allow_request_decorator_1.USER_ID, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredId) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authrization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer != 'Bearer' || !token) {
                throw new common_1.UnauthorizedException('Unauthorized');
            }
            const user = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some((role) => requiredRoles.includes(role.id));
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
    }
};
AllowRequest = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService, core_1.Reflector])
], AllowRequest);
exports.AllowRequest = AllowRequest;
//# sourceMappingURL=allow-request.guard.js.map
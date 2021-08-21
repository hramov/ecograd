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
exports.JwtAccessGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let JwtAccessGuard = class JwtAccessGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        try {
            const bearer = req.headers.authorization.split(' ')[0];
            const token = req.headers.authorization.split(' ')[1];
            const userid = req.params.id;
            if (bearer != 'Bearer' || !token)
                throw new common_1.UnauthorizedException('Unauthorized');
            if (!this.authService.validateJwt(token))
                throw new common_1.UnauthorizedException('Unauthorized');
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
    }
};
JwtAccessGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], JwtAccessGuard);
exports.JwtAccessGuard = JwtAccessGuard;
//# sourceMappingURL=jwt-access.guard.js.map
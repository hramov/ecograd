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
var AdminStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const tsyringe_1 = require("tsyringe");
const Admin_model_1 = require("../../modules/database/model/user/profiles/Admin.model");
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    // issuer: 'accounts.ecograd.ru',
    // audience: 'ecograd.ru',
};
let AdminStrategy = AdminStrategy_1 = class AdminStrategy extends passport_jwt_1.Strategy {
    static strategyName = 'admin';
    constructor() {
        super(opts, AdminStrategy_1.verify);
    }
    static async verify(jwt_payload, done) {
        if (!jwt_payload.sub)
            return new Error('Token not valid');
        const admin = await Admin_model_1.Admin.findOneBy({
            user: { id: jwt_payload.sub },
        });
        if (!admin) {
            return done(admin, null);
        }
        return done(null, admin);
    }
};
AdminStrategy = AdminStrategy_1 = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], AdminStrategy);
exports.AdminStrategy = AdminStrategy;

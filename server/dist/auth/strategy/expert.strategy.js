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
var ExpertStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpertStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const tsyringe_1 = require("tsyringe");
const Expert_model_1 = require("../../modules/database/model/user/profiles/Expert.model");
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    // issuer: 'accounts.ecograd.ru',
    // audience: 'ecograd.ru',
};
let ExpertStrategy = ExpertStrategy_1 = class ExpertStrategy extends passport_jwt_1.Strategy {
    static strategyName = 'expert';
    constructor() {
        super(opts, ExpertStrategy_1.verify);
    }
    static async verify(jwt_payload, done) {
        if (!jwt_payload.sub)
            return new Error('Token not valid');
        const expert = await Expert_model_1.Expert.findOneBy({
            user: { id: jwt_payload.sub },
        });
        if (!expert) {
            return done(expert, null);
        }
        return done(null, expert);
    }
};
ExpertStrategy = ExpertStrategy_1 = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], ExpertStrategy);
exports.ExpertStrategy = ExpertStrategy;

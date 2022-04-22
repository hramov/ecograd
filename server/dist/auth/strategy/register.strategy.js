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
var RegisterStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterStrategy = void 0;
const passport_local_1 = require("passport-local");
const tsyringe_1 = require("tsyringe");
const create_user_router_1 = require("../../modules/api/router/user/create-user.router");
const User_model_1 = require("../../modules/database/model/user/User.model");
const opts = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};
let RegisterStrategy = RegisterStrategy_1 = class RegisterStrategy extends passport_local_1.Strategy {
    constructor() {
        super(opts, RegisterStrategy_1.verify);
    }
    static async verify(req, email, password, done) {
        if (!email)
            return new Error('Credentials miss');
        let user = await User_model_1.User.findOneBy({ email });
        if (user) {
            return done('User already exists', user);
        }
        return done(null, await (0, create_user_router_1.createUser)(req, null));
    }
};
RegisterStrategy = RegisterStrategy_1 = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], RegisterStrategy);
exports.RegisterStrategy = RegisterStrategy;

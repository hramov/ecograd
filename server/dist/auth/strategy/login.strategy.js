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
var LoginStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginStrategy = void 0;
const bcrypt_1 = require("bcrypt");
const passport_local_1 = require("passport-local");
const tsyringe_1 = require("tsyringe");
const User_model_1 = require("../../modules/database/model/user/User.model");
const opts = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false,
};
let LoginStrategy = LoginStrategy_1 = class LoginStrategy extends passport_local_1.Strategy {
    constructor() {
        super(opts, LoginStrategy_1.verify);
    }
    static async verify(email, password, done) {
        if (!email || !password)
            return new Error('Credentials miss');
        let user = await User_model_1.User.findOneBy({ email });
        if (user && (0, bcrypt_1.compare)(password, user.password))
            return done(null, user);
        return done(user, null);
    }
};
LoginStrategy = LoginStrategy_1 = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], LoginStrategy);
exports.LoginStrategy = LoginStrategy;

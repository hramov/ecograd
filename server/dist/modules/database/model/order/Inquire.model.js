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
exports.Inquire = void 0;
const typeorm_1 = require("typeorm");
const Ecograd_model_1 = require("../Ecograd.model");
const User_model_1 = require("../user/User.model");
const Order_model_1 = require("./Order.model");
let Inquire = class Inquire extends Ecograd_model_1.Ecograd {
    title;
    path;
    order;
    sender;
};
__decorate([
    (0, typeorm_1.Column)('text', { unique: false }),
    __metadata("design:type", String)
], Inquire.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], Inquire.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_model_1.Order, (order) => order.id),
    __metadata("design:type", Order_model_1.Order)
], Inquire.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_model_1.User, (user) => user.id),
    __metadata("design:type", User_model_1.User)
], Inquire.prototype, "sender", void 0);
Inquire = __decorate([
    (0, typeorm_1.Entity)({
        schema: 'business',
    })
], Inquire);
exports.Inquire = Inquire;

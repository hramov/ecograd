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
exports.Attach = void 0;
const typeorm_1 = require("typeorm");
const Ecograd_model_1 = require("../Ecograd.model");
const User_model_1 = require("../user/User.model");
const Order_model_1 = require("./Order.model");
const Section_model_1 = require("./Section.model");
let Attach = class Attach extends Ecograd_model_1.Ecograd {
    title;
    path;
    is_new;
    order;
    section;
    sender;
};
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Attach.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], Attach.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], Attach.prototype, "is_new", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_model_1.Order, (order) => order.id),
    __metadata("design:type", Order_model_1.Order)
], Attach.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Section_model_1.Section, (section) => section.id),
    __metadata("design:type", Section_model_1.Section)
], Attach.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_model_1.User, (user) => user.id),
    __metadata("design:type", User_model_1.User)
], Attach.prototype, "sender", void 0);
Attach = __decorate([
    (0, typeorm_1.Entity)({
        schema: 'business',
    })
], Attach);
exports.Attach = Attach;

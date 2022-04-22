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
exports.Section = void 0;
const typeorm_1 = require("typeorm");
const Ecograd_model_1 = require("../Ecograd.model");
const Attach_model_1 = require("./Attach.model");
const Order_model_1 = require("./Order.model");
let Section = class Section extends Ecograd_model_1.Ecograd {
    arrange;
    title;
    status;
    parent;
    order;
    attach;
};
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Section.prototype, "arrange", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Section.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Section.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Section.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_model_1.Order, (order) => order.id),
    __metadata("design:type", Order_model_1.Order)
], Section.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Attach_model_1.Attach, (attach) => attach.id),
    __metadata("design:type", Array)
], Section.prototype, "attach", void 0);
Section = __decorate([
    (0, typeorm_1.Entity)({
        schema: 'business',
    })
], Section);
exports.Section = Section;

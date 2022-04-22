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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const Ecograd_model_1 = require("../Ecograd.model");
const Client_model_1 = require("../user/profiles/Client.model");
const Expert_model_1 = require("../user/profiles/Expert.model");
const Attach_model_1 = require("./Attach.model");
const Section_model_1 = require("./Section.model");
let Order = class Order extends Ecograd_model_1.Ecograd {
    title;
    exp_type;
    object_type;
    docs_cipher;
    rii_cipher;
    status;
    client;
    expert;
    files;
    sections;
};
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Order.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "exp_type", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "object_type", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "docs_cipher", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "rii_cipher", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Client_model_1.Client, (client) => client.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Client_model_1.Client)
], Order.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Expert_model_1.Expert, (expert) => expert.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Expert_model_1.Expert)
], Order.prototype, "expert", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Attach_model_1.Attach, (attach) => attach.id),
    __metadata("design:type", Array)
], Order.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Section_model_1.Section, (section) => section.id),
    __metadata("design:type", Array)
], Order.prototype, "sections", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)({
        schema: 'business',
    })
], Order);
exports.Order = Order;

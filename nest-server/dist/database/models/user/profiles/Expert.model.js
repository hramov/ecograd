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
exports.Expert = void 0;
const typeorm_1 = require("typeorm");
const Profile_model_1 = require("./Profile.model");
let Expert = class Expert extends Profile_model_1.Profile {
};
__decorate([
    (0, typeorm_1.Column)('text', { unique: true, nullable: true }),
    __metadata("design:type", String)
], Expert.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Expert.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Expert.prototype, "certificate", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Expert.prototype, "direction", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Expert.prototype, "misc", void 0);
Expert = __decorate([
    (0, typeorm_1.Entity)({
        schema: 'auth',
    })
], Expert);
exports.Expert = Expert;
//# sourceMappingURL=Expert.model.js.map
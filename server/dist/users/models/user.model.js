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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const expert_model_1 = require("../../experts/models/expert.model");
const order_model_1 = require("../../orders/models/order.model");
const role_model_1 = require("../../roles/models/role.model");
const user_role_model_1 = require("./user-role.model");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING, unique: false, allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "second_name", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.DATE, unique: false, allowNull: true }),
    __metadata("design:type", Date)
], User.prototype, "birth_date", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "image_url", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => order_model_1.Order),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => role_model_1.Role, () => user_role_model_1.UserRole),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => expert_model_1.Expert, { onDelete: 'CASCADE' }),
    __metadata("design:type", expert_model_1.Expert)
], User.prototype, "expert", void 0);
User = __decorate([
    sequelize_typescript_1.Table({ tableName: 'users' })
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map
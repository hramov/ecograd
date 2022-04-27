"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const roles_1 = require("../auth/roles");
const Feedback_model_1 = require("../database/models/user/Feedback.model");
const Admin_model_1 = require("../database/models/user/profiles/Admin.model");
const Client_model_1 = require("../database/models/user/profiles/Client.model");
const Expert_model_1 = require("../database/models/user/profiles/Expert.model");
const User_model_1 = require("../database/models/user/User.model");
let UserService = class UserService {
    async getUserByID(user_id) {
        return await User_model_1.User.findOne(user_id);
    }
    async getUserByEmail(email) {
        return await User_model_1.User.findOne({ where: { email: email } });
    }
    async createUser(createUserDto, profileDto) {
        const result = User_model_1.User.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: (0, bcrypt_1.hashSync)(createUserDto.password, 10),
            profile: createUserDto.profile,
        });
        const savedUser = await result.save();
        let error = null;
        switch (createUserDto.profile) {
            case roles_1.ROLES.Admin:
                const admin = Admin_model_1.Admin.create({
                    user: savedUser,
                });
                await admin.save();
                break;
            case roles_1.ROLES.Expert:
                const expertDto = profileDto;
                const expert = Expert_model_1.Expert.create({
                    certificate: expertDto.certificate,
                    direction: expertDto.direction,
                    misc: expertDto.misc,
                    position: expertDto.position,
                    phone: expertDto.phone,
                    user: savedUser,
                });
                await expert.save();
                break;
            case roles_1.ROLES.Client:
                const clientDto = profileDto;
                const client = Client_model_1.Client.create({
                    phone: clientDto.phone,
                    user: savedUser,
                });
                await client.save();
                break;
            default:
                error = new Error('Профиль не опознан');
        }
        return result;
    }
    async deleteUser(user_id) {
        return await User_model_1.User.delete(user_id);
    }
    getProfiles() {
        return [
            {
                id: 1,
                title: 'Администратор',
            },
            {
                id: 2,
                title: 'Эксперт',
            },
            {
                id: 3,
                title: 'Клиент',
            },
        ];
    }
    async getUsers(profile) {
        if (profile) {
            switch (profile) {
                case roles_1.ROLES.Admin:
                    return await Admin_model_1.Admin.find({
                        relations: ['user'],
                    });
                case roles_1.ROLES.Client:
                    return await Client_model_1.Client.find({
                        relations: ['user'],
                    });
                case roles_1.ROLES.Expert:
                    return await Expert_model_1.Expert.find({
                        relations: ['user'],
                    });
            }
        }
        return {
            admin: await Admin_model_1.Admin.find({ relations: ['user'] }),
            expert: await Expert_model_1.Expert.find({ relations: ['user'] }),
            client: await Client_model_1.Client.find({ relations: ['user'] }),
        };
    }
    async getExperts() {
        return await Expert_model_1.Expert.find({ relations: ['user'] });
    }
    async createFeedback(createFeedbackDto) {
        const feedback = Feedback_model_1.Feedback.create({
            name: createFeedbackDto.name,
            email: createFeedbackDto.email,
            feedback: createFeedbackDto.feedback,
        });
        return await feedback.save();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
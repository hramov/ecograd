"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const admin_strategy_1 = require("../../../../auth/strategy/admin.strategy");
const jwt_strategy_1 = require("../../../../auth/strategy/jwt.strategy");
const login_strategy_1 = require("../../../../auth/strategy/login.strategy");
const register_strategy_1 = require("../../../../auth/strategy/register.strategy");
const Feedback_model_1 = require("../../../database/model/user/Feedback.model");
const Expert_model_1 = require("../../../database/model/user/profiles/Expert.model");
const create_user_router_1 = require("./create-user.router");
const delete_user_router_1 = require("./delete-user.router");
const get_profiles_router_1 = require("./get-profiles.router");
const get_user_info_router_1 = require("./get-user-info.router");
const get_users_router_1 = require("./get-users.router");
const login_router_1 = require("./login.router");
const search_user_router_1 = require("./search-user.router");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post('/login', passport_1.default.authenticate(new login_strategy_1.LoginStrategy(), { session: false }), login_router_1.login);
router.post('/register', passport_1.default.authenticate(new register_strategy_1.RegisterStrategy(), { session: false }), login_router_1.login);
router.get('/info', passport_1.default.authenticate(new jwt_strategy_1.JWTStrategy(), { session: false }), get_user_info_router_1.getUserInfo);
router.get('/profile', passport_1.default.authenticate(new admin_strategy_1.AdminStrategy(), { session: false }), get_profiles_router_1.getProfiles);
router.get('/expert', async (req, res) => res.json(await Expert_model_1.Expert.find({ relations: ['user'] })));
router.post('/feedback', async (req, res) => {
    const feedback = Feedback_model_1.Feedback.create({
        name: req.body.name,
        email: req.body.email,
        feedback: req.body.text,
    });
    res.json(await feedback.save());
});
router.delete('/:id', passport_1.default.authenticate(new admin_strategy_1.AdminStrategy(), { session: false }), delete_user_router_1.deleteUser);
router.post('/search', passport_1.default.authenticate(new admin_strategy_1.AdminStrategy(), { session: false }), search_user_router_1.searchUser);
router.post('/', passport_1.default.authenticate(new admin_strategy_1.AdminStrategy(), { session: false }), create_user_router_1.createUser);
router.get('/', passport_1.default.authenticate(new admin_strategy_1.AdminStrategy(), { session: false }), get_users_router_1.getUsers);

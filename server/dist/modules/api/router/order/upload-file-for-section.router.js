"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileForSection = void 0;
const path_1 = __importStar(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const fs_1 = __importDefault(require("fs"));
const Attach_model_1 = require("../../../database/model/order/Attach.model");
const Order_model_1 = require("../../../database/model/order/Order.model");
const Section_model_1 = require("../../../database/model/order/Section.model");
const not_found_error_1 = require("../../../error/http/not-found.error");
const logger_1 = require("../../../logger");
const bad_request_error_1 = require("../../../error/http/bad-request.error");
async function uploadFileForSection(req, res) {
    const sender = req.user;
    if (!req.body.order_id || !req.body.section_id)
        return (0, bad_request_error_1.BadRequestError)(res);
    const order = await Order_model_1.Order.findOneBy({
        id: parseInt(req.body.order_id),
    });
    if (!order) {
        return (0, not_found_error_1.NotFoundError)(res, 'order');
    }
    const section = await Section_model_1.Section.findOneBy({ id: req.body.section_id });
    if (!section) {
        return (0, not_found_error_1.NotFoundError)(res, 'section');
    }
    const fileNames = Object.keys(req.files);
    console.log(fileNames);
    if (fileNames.length == 0)
        return (0, bad_request_error_1.BadRequestError)(res);
    try {
        const file = req.files[fileNames[0]];
        const name = file.name;
        const size = file.data.length;
        const md5 = file.md5;
        if (size > 10_000_000_000) {
            throw 'File size overflow';
        }
        const url = md5 + '_' + Date.now() + (0, path_1.extname)(name);
        const dirPath = path_1.default.resolve(app_root_path_1.default.path, 'public/order_data/' + order.id + '/' + section.arrange);
        if (!fs_1.default.existsSync(dirPath)) {
            fs_1.default.mkdirSync(dirPath, { recursive: true });
        }
        await file.mv(path_1.default.resolve(dirPath + '/' + url));
        const attach = Attach_model_1.Attach.create({
            title: name,
            path: 'public/order_data/' +
                order.id +
                '/' +
                section.arrange +
                '/' +
                url,
            is_new: true,
            order,
            section,
            sender,
        });
        await attach.save();
        if (sender.profile == 'Эксперт') {
            section.status = 'taken';
            await section.save();
        }
    }
    catch (_err) {
        const err = _err;
        logger_1.Logger.writeError(err.message);
        return res.json({
            message: err,
        });
    }
    res.json({
        message: 'Successfully uploaded file!',
    });
}
exports.uploadFileForSection = uploadFileForSection;
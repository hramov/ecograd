"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInquireFolderName = exports.getFolderName = exports.editFileName = void 0;
const app_root_path_1 = require("app-root-path");
const fs_1 = require("fs");
const path_1 = require("path");
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(8)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    file.filename = `${randomName}-${name}${fileExtName}`;
    callback(null, file.filename);
};
exports.editFileName = editFileName;
const getFolderName = (req, file, callback) => {
    const order_id = req.params.order_id;
    const dirPath = (0, path_1.resolve)(app_root_path_1.path, 'public/orders/', order_id, file.fieldname);
    if (!(0, fs_1.existsSync)(dirPath)) {
        (0, fs_1.mkdirSync)(dirPath, { recursive: true });
    }
    callback(null, dirPath);
};
exports.getFolderName = getFolderName;
const getInquireFolderName = (req, file, callback) => {
    const dirPath = (0, path_1.resolve)(app_root_path_1.path, 'public/orders/', req.params.order_id, 'inquires');
    if (!(0, fs_1.existsSync)(dirPath)) {
        (0, fs_1.mkdirSync)(dirPath, { recursive: true });
    }
    callback(null, dirPath);
};
exports.getInquireFolderName = getInquireFolderName;
//# sourceMappingURL=edit-filename.js.map
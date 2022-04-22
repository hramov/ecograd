"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const app_root_path_1 = __importDefault(require("app-root-path"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Logger {
    static writeInfo(msg) {
        const result = `INFO | ${new Date().toLocaleString()} | ${msg}`;
        console.log(result);
        Logger.writeToFile(result);
    }
    static writeError(msg) {
        const result = `ERROR | ${new Date().toLocaleString()} | ${msg}`;
        console.log(result);
        Logger.writeToFile(result);
    }
    static writeToFile(msg) {
        const today = new Date().toLocaleDateString().split('.').join('_');
        const year = new Date().getFullYear().toString();
        const month = (new Date().getMonth() + 1).toString();
        const dir = path_1.default.resolve(app_root_path_1.default.path, 'logs', year, month);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        const file = path_1.default.resolve(dir, today + '.txt');
        if (fs_1.default.existsSync(file)) {
            fs_1.default.appendFileSync(file, msg + '\n');
        }
        else {
            fs_1.default.writeFileSync(file, msg + '\n');
        }
    }
}
exports.Logger = Logger;

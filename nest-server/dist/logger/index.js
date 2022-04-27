"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
class Logger {
    static writeInfo(msg) {
        const result = `INFO | ${new Date().toLocaleString()} | ${msg}`;
        common_1.Logger.log(result);
        Logger.writeToFile(result);
    }
    static writeError(method, msg) {
        const result = `ERROR | ${new Date().toLocaleString()} | ${method} | ${msg}`;
        common_1.Logger.error(result);
        Logger.writeToFile(result);
    }
    static writeToFile(msg) {
        const today = new Date().toLocaleDateString().split('/').join('_');
        const year = new Date().getFullYear().toString();
        const month = (new Date().getMonth() + 1).toString();
        const dir = (0, path_1.resolve)(__dirname, '../../logs', year, month);
        if (!(0, fs_1.existsSync)(dir)) {
            (0, fs_1.mkdirSync)(dir, { recursive: true });
        }
        const file = (0, path_1.resolve)(dir, today + '.txt');
        if ((0, fs_1.existsSync)(file)) {
            (0, fs_1.appendFileSync)(file, msg + '\n');
        }
        else {
            (0, fs_1.writeFileSync)(file, msg + '\n');
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const api_1 = require("./modules/api");
const database_1 = require("./modules/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class App {
    async bootstrap() {
        const db = new database_1.Database();
        await db.init();
        const api = new api_1.API();
        await api.start();
    }
}
const app = new App();
app.bootstrap();

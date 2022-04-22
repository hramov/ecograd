"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = exports.SuccessAPIReply = exports.APIReply = void 0;
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("../logger");
const router_1 = require("./router/router");
const passport_1 = __importDefault(require("passport"));
const jwt_strategy_1 = require("../../auth/strategy/jwt.strategy");
class APIReply {
    status;
    data;
    error;
}
exports.APIReply = APIReply;
async function SuccessAPIReply(res, data) {
    res.status(200).json({
        status: true,
        error: null,
        data: data,
    });
}
exports.SuccessAPIReply = SuccessAPIReply;
class API {
    constructor() { }
    async start() {
        const app = (0, express_1.default)();
        app.disable('x-powered-by');
        app.use(express_1.default.json({ limit: '10mb' }));
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(passport_1.default.initialize());
        app.use((0, express_fileupload_1.default)());
        app.use((0, cors_1.default)());
        app.use('/api/public', express_1.default.static('public'));
        const router = new router_1.APIRouter();
        app.use('/api', router.init());
        passport_1.default.use(new jwt_strategy_1.JWTStrategy());
        const port = 5005;
        try {
            app.listen(port, () => {
                let proc = require('process');
                logger_1.Logger.writeInfo('app listening on port ' +
                    port +
                    ', ' +
                    'node: ' +
                    proc.version);
            });
        }
        catch (_err) {
            const err = _err;
            logger_1.Logger.writeError(err.message);
        }
    }
}
exports.API = API;

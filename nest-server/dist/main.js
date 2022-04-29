"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const fs_1 = require("fs");
const app_module_1 = require("./app.module");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const roles_guard_1 = require("./auth/guards/roles.guard");
const init_1 = require("./database/init");
const logger_1 = require("./logger");
const httpsOptions = {
    key: (0, fs_1.readFileSync)('data/cert/privkey.pem'),
    cert: (0, fs_1.readFileSync)('data/cert/fullchain.pem'),
};
async function bootstrap() {
    let app;
    if (process.env.START_TYPE == 'PROD') {
        app = await core_1.NestFactory.create(app_module_1.AppModule, {
            httpsOptions,
        });
    }
    else if (process.env.START_TYPE == 'DEV') {
        app = await core_1.NestFactory.create(app_module_1.AppModule);
    }
    else {
        throw new Error('Unknown start type');
    }
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(new core_1.Reflector()), new roles_guard_1.RolesGuard(new core_1.Reflector()));
    await init_1.DatabaseIniter.initUser();
    await app.listen(5005);
    logger_1.Logger.writeInfo(`Server started in ${process.env.START_TYPE} mode at port 5005`);
}
bootstrap();
//# sourceMappingURL=main.js.map
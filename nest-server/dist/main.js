"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const fs_1 = require("fs");
const app_module_1 = require("./app.module");
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
    await app.listen(5005);
    logger_1.Logger.writeInfo(`Server started in ${process.env.START_TYPE} mode at port 5005`);
}
bootstrap();
//# sourceMappingURL=main.js.map
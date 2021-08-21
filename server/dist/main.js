"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    app.setGlobalPrefix('api/v2');
    app.enableCors();
    const port = process.env.APP_PORT;
    await app.listen(port || 3000, () => {
        logger.debug(`Server started at port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
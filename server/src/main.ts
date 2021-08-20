import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {});
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()

  const port = process.env.APP_PORT;
  await app.listen(port || 3000, () => {
    logger.debug(`Server started at port ${port}`);
  });
}
bootstrap();

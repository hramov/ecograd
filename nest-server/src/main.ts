import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { Logger } from './logger';

const httpsOptions = {
	key: readFileSync('data/cert/privkey.pem'),
	cert: readFileSync('data/cert/fullchain.pem'),
};

async function bootstrap() {
	let app: NestExpressApplication;
	if (process.env.START_TYPE == 'PROD') {
		app = await NestFactory.create<NestExpressApplication>(AppModule, {
			httpsOptions,
		});
	} else if (process.env.START_TYPE == 'DEV') {
		app = await NestFactory.create<NestExpressApplication>(AppModule);
	} else {
		throw new Error('Unknown start type');
	}

	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');
	app.enableCors();

	await app.listen(5005);
	Logger.writeInfo(
		`Server started in ${process.env.START_TYPE} mode at port 5005`,
	);
}
bootstrap();

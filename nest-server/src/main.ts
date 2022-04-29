import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { DatabaseIniter } from './database/init';
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
	app.useGlobalGuards(
		new JwtAuthGuard(new Reflector()),
		new RolesGuard(new Reflector()),
	);

	await DatabaseIniter.initUser();

	await app.listen(5005);
	Logger.writeInfo(
		`Server started in ${process.env.START_TYPE} mode at port 5005`,
	);
}

bootstrap();

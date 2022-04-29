import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/models/user/User.model';
import { Admin } from './database/models/user/profiles/Admin.model';
import { Client } from './database/models/user/profiles/Client.model';
import { Expert } from './database/models/user/profiles/Expert.model';
import { Order } from './database/models/order/Order.model';
import { Section } from './database/models/order/Section.model';
import { Attach } from './database/models/order/Attach.model';
import { Feedback } from './database/models/user/Feedback.model';
import { Inquire } from './database/models/order/Inquire.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/index';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'app'),
		}),
		MulterModule.register({
			dest: 'public',
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		AuthModule,
		UserModule,
		OrderModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			synchronize: false,
			logging: ['error'],
			entities: [
				User,
				Admin,
				Client,
				Expert,
				Order,
				Section,
				Attach,
				Feedback,
				Inquire,
			],
			subscribers: [],
			migrations: [],
		}),
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {
	constructor(private readonly configService: ConfigService) {}
}

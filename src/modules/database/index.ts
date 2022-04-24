import { DataSource } from 'typeorm';
import { DatabaseIniter } from './init';
import { Attach } from './model/order/Attach.model';
import { Inquire } from './model/order/Inquire.model';
import { Order } from './model/order/Order.model';
import { Section } from './model/order/Section.model';
import { Feedback } from './model/user/Feedback.model';
import { Admin } from './model/user/profiles/Admin.model';
import { Client } from './model/user/profiles/Client.model';
import { Expert } from './model/user/profiles/Expert.model';
import { User } from './model/user/User.model';
export class Database {
	public async init() {
		try {
			const appDataSource = new DataSource({
				type: 'postgres',
				host: process.env.DB_HOST,
				port: parseInt(process.env.DB_PORT),
				username: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				synchronize: true,
				logging: true,
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
			});
			await appDataSource.initialize();
			await DatabaseIniter.initUser();
		} catch (_err) {
			const err = _err as Error;
			console.log(err.message);
		}
	}
}

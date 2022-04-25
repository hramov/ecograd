import 'reflect-metadata';
import { API } from './modules/api';
import { Database } from './modules/database';
import dotenv from 'dotenv';
import { Logger } from './modules/logger';
dotenv.config();
class App {
	async bootstrap() {
		Logger.writeInfo('Start initializing application');
		
		const db = new Database();
		await db.init();

		const api = new API();
		await api.start();
	}
}

const app = new App();
app.bootstrap();

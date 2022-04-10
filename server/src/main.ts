import 'reflect-metadata';
import { container } from 'tsyringe';
import { API } from './modules/api';
import { Database } from './modules/database';

class App {
	async bootstrap() {
		const db = new Database();
		await db.init();

		const api = container.resolve(API);
		await api.start();
	}
}

const app = new App();
app.bootstrap();

import { API } from './modules/api';
import { Database } from './modules/database';

class App {
	bootstrap() {
		const db = new Database();
		const instance = db.init();
		const api = new API();
		api.start(instance);
	}
}

const app = new App();
app.bootstrap();

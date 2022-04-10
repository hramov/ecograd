import { AppDataSource } from './data-source';

export class Database {
	public async init() {
		try {
			await AppDataSource.initialize();
		} catch (_err) {
			const err = _err as Error;
			console.log(err.message);
		}
	}
}

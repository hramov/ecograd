import { AppDataSource } from './data-source';
import { DatabaseIniter } from './init';

export class Database {
	public async init() {
		try {
			await AppDataSource.initialize();
			// const dbInit = new DatabaseIniter();
			// await dbInit.initProfile();
			// await dbInit.initRole();
		} catch (_err) {
			const err = _err as Error;
			console.log(err.message);
		}
	}
}

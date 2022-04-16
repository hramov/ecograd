import { AppDataSource } from './data-source';
import { DatabaseIniter } from './init';

export class Database {
	public async init() {
		try {
			await AppDataSource.initialize();
			// await AppDataSource.query(`create schema "user"`);
			// await AppDataSource.query(`create schema "order"`);
			// const dbInit = new DatabaseIniter();
			// await dbInit.initProfile();
			// await dbInit.initUser();
		} catch (_err) {
			const err = _err as Error;
			console.log(err.message);
		}
	}
}

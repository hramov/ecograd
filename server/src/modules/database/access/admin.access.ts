import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../model/user/User.model';
import { Admin } from '../model/user/Admin.model';

export class AdminAccess {
	private repository: Repository<User>;
	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	public async create(admin: Admin) {
		return await this.repository.save(admin);
	}
}

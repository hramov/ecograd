import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Role } from '../model/Role.model';

export class RoleAccess {
	private repository: Repository<Role>;
	constructor() {
		this.repository = AppDataSource.getRepository(Role);
	}

	public async save(role: Role): Promise<Role> {
		return await this.repository.save(role);
	}

	public async get(): Promise<Role[]> {
		return await this.repository.find();
	}
}

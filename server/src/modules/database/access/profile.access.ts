import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Profile } from '../model/user/Profile.model';

export class ProfileAccess {
	private repository: Repository<Profile>;
	constructor() {
		this.repository = AppDataSource.getRepository(Profile);
	}

	public async save(role: Profile): Promise<Profile> {
		return await this.repository.save(role);
	}

	public async get(): Promise<Profile[]> {
		return await this.repository.find();
	}
}

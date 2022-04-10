import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Expert } from '../model/Expert.model';

export class CommonAccess {
	private repository: Repository<Expert>;
	constructor() {
		this.repository = AppDataSource.getRepository(Expert);
	}

	public async getExpertsForLandingPage() {
		return await this.repository.find();
	}
}

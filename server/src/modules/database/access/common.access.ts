import { Repository } from 'typeorm';
import { ExpertDto } from '../../../entity/auth/dto/expert.dto';
import { AppDataSource } from '../data-source';
import { Expert } from '../model/user/Expert.model';

export class CommonAccess {
	private repository: Repository<Expert>;
	constructor() {
		this.repository = AppDataSource.getRepository(Expert);
	}

	public async getExpertsForLandingPage() {
		return await this.repository.find();
	}

	public async createExpert(data: ExpertDto) {
		return await this.repository.save(data);
	}

	public async updateExpert(data: ExpertDto) {
		return await this.repository.save(data);
	}
}

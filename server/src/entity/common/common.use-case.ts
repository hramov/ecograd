import { autoInjectable } from 'tsyringe';
import { APIReply } from '../../modules/api';
import { CommonAccess } from '../../modules/database/access/common.access';
import { Expert } from '../../modules/database/model/Expert.model';

@autoInjectable()
export class CommonUseCase {
	constructor(private readonly commonAccess?: CommonAccess) {}

	public async getExperts(): Promise<APIReply<Expert[]>> {
		const result = await this.commonAccess.getExpertsForLandingPage();
		return {
			status: true,
			data: result,
			error: null,
		};
	}
}

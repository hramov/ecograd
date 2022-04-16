import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { SuccessAPIReply } from '..';
import { CommonAccess } from '../../database/access/common.access';

@autoInjectable()
export class CommonController {
	constructor(private readonly commonAccess?: CommonAccess) {}

	public async getExperts(req: Request, res: Response) {
		return await SuccessAPIReply(
			res,
			await this.commonAccess.getExpertsForLandingPage(),
		);
	}

	public async createExpert(req: Request, res: Response) {
		return await SuccessAPIReply(
			res,
			await this.commonAccess.createExpert(req.body),
		);
	}

	public async updateExpert(req: Request, res: Response) {
		return await SuccessAPIReply(
			res,
			await this.commonAccess.updateExpert(req.body),
		);
	}
}

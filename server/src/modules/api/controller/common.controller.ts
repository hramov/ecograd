import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { SuccessAPIReply } from '..';
import { CommonUseCase } from '../../../entity/common/common.use-case';

@autoInjectable()
export class CommonController {
	constructor(private readonly commonUseCase?: CommonUseCase) {}

	public async getExperts(req: Request, res: Response) {
		return await SuccessAPIReply(
			res,
			await this.commonUseCase.getExperts(),
		);
	}
}

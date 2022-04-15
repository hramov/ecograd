import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { AuthUseCase } from '../../../entity/auth/auth.use-case';

@autoInjectable()
export class UserController {
	constructor(private readonly authUseCase?: AuthUseCase) {}

	public async login(req: Request, res: Response) {
		res.json({
			access_token: await this.authUseCase.login(req.user),
		});
	}

	public async register(req: Request, res: Response) {
		res.json({
			access_token: await this.authUseCase.login(req.user),
		});
	}

	public async getUserInfo(req: Request, res: Response) {
		res.json(req.user);
	}
}

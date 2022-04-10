import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { AuthUseCase } from '../../../entity/auth/auth.use-case';
import { NoCredentialsError } from '../../error/http/no-credentials.error';

@autoInjectable()
export class UserController {
	constructor(private readonly authUseCase?: AuthUseCase) {}

	public async login(req: Request, res: Response) {
		if (!req.body || !req.body.username || !req.body.password) {
			return NoCredentialsError(res);
		}
		return await this.authUseCase.login(
			req.body.username,
			req.body.password,
		);
	}

	public async register(req: Request, res: Response) {
		if (
			!req.body ||
			!req.body.username ||
			!req.body.password ||
			!req.body.name
		) {
			return NoCredentialsError(res);
		}
		return await this.authUseCase.register(req.body);
	}

	public async getUserInfo(req: Request, res: Response) {}
}

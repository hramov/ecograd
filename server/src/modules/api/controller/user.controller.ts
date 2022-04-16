import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { AuthUseCase } from '../../../entity/auth/auth.use-case';
import { ProfileAccess } from '../../database/access/profile.access';
import { UserAccess } from '../../database/access/user.access';

@autoInjectable()
export class UserController {
	constructor(
		private readonly authUseCase?: AuthUseCase,
		private readonly userAccess?: UserAccess,
		private readonly profileAccess?: ProfileAccess,
	) {}

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

	public async getAllUsers(req: Request, res: Response) {
		res.json(await this.userAccess.getAllUsers());
	}

	public async getProfiles(req: Request, res: Response) {
		res.json(await this.profileAccess.get());
	}

	public async create(req: Request, res: Response) {
		res.json(await this.userAccess.create(req.body.user, req.body.profile));
	}
}

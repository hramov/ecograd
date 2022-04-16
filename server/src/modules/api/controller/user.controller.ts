import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { AuthUseCase } from '../../../entity/auth/auth.use-case';
import { RoleAccess } from '../../database/access/role.access';
import { UserAccess } from '../../database/access/user.access';

@autoInjectable()
export class UserController {
	constructor(
		private readonly authUseCase?: AuthUseCase,
		private readonly userAccess?: UserAccess,
		private readonly roleAccess?: RoleAccess,
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

	public async getRoles(req: Request, res: Response) {
		res.json(await this.roleAccess.get());
	}
}

import { Router, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { UserController } from '../controller/user.controller';

@autoInjectable()
export class UserRouter {
	private readonly router;
	constructor(private readonly userController?: UserController) {
		this.router = Router();
	}
	init() {
		this.router.post('login', (req: Request, res: Response) =>
			this.userController.login(req, res),
		);

		this.router.post('register', (req: Request, res: Response) =>
			this.userController.register(req, res),
		);

		this.router.get('user-info', (req: Request, res: Response) =>
			this.userController.getUserInfo(req, res),
		);

		return this.router;
	}
}

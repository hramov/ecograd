import { Router, Request, Response } from 'express';
import passport from 'passport';
import { autoInjectable } from 'tsyringe';
import { JWTStrategy } from '../../../entity/auth/strategy/jwt.strategy';
import { LoginStrategy } from '../../../entity/auth/strategy/login.strategy';
import { RegisterStrategy } from '../../../entity/auth/strategy/register.strategy';
import { UserController } from '../controller/user.controller';

@autoInjectable()
export class UserRouter {
	private readonly router;
	constructor(private readonly userController?: UserController) {
		this.router = Router();
	}
	init() {
		this.router.post(
			'/login',
			passport.authenticate(new LoginStrategy(), { session: false }),
			(req: Request, res: Response) =>
				this.userController.login(req, res),
		);

		this.router.post(
			'/register',
			passport.authenticate(new RegisterStrategy(), { session: false }),
			(req: Request, res: Response) =>
				this.userController.register(req, res),
		);

		this.router.get(
			'/info',
			passport.authenticate(new JWTStrategy(), { session: false }),
			(req: Request, res: Response) =>
				this.userController.getUserInfo(req, res),
		);

		return this.router;
	}
}

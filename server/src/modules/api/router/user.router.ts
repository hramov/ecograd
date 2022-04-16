import { Router, Request, Response } from 'express';
import passport from 'passport';
import { autoInjectable } from 'tsyringe';
import { AdminStrategy } from '../../../entity/auth/strategy/admin.strategy';
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

		this.router.get(
			'/all',
			passport.authenticate(new AdminStrategy(), { session: false }),
			(req: Request, res: Response) =>
				this.userController.getAllUsers(req, res),
		);

		this.router.get(
			'/profile',
			passport.authenticate(new AdminStrategy(), { session: false }),
			(req: Request, res: Response) =>
				this.userController.getProfiles(req, res),
		);

		this.router.post(
			'/',
			// passport.authenticate(new AdminStrategy(), { session: false }),
			(req: Request, res: Response) =>
				this.userController.create(req, res),
		);

		return this.router;
	}
}

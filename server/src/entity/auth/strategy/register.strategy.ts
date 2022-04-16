import { Request } from 'express';
import {
	IStrategyOptionsWithRequest,
	IVerifyOptions,
	Strategy,
} from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { UserAccess } from '../../../modules/database/access/user.access';

const opts: IStrategyOptionsWithRequest = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
};

@autoInjectable()
export class RegisterStrategy extends Strategy {
	private static access: UserAccess;
	constructor(private readonly userAccess?: UserAccess) {
		super(opts, RegisterStrategy.verify);
		RegisterStrategy.access = userAccess;
	}

	private static async verify(
		req: Request,
		email: string,
		password: string,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		const user = await RegisterStrategy.access.checkIfUserExistsByEmail(
			email,
		);
		if (user) {
			return done('User already exists', user);
		}
		return done(
			null,
			await RegisterStrategy.access.create(
				req.body.user,
				req.body.profile,
			),
		);
	}
}

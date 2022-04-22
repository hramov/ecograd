import { Request } from 'express';
import {
	IStrategyOptionsWithRequest,
	IVerifyOptions,
	Strategy,
} from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { createUser } from '../../modules/api/router/user/create-user.router';
import { User } from '../../modules/database/model/user/User.model';

const opts: IStrategyOptionsWithRequest = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
};

@autoInjectable()
export class RegisterStrategy extends Strategy {
	constructor() {
		super(opts, RegisterStrategy.verify);
	}

	private static async verify(
		req: Request,
		email: string,
		password: string,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		if (!email) return new Error('Credentials miss');
		let user = await User.findOneBy({ email });
		if (user) {
			return done('User already exists', user);
		}
		return done(null, await createUser(req, null));
	}
}

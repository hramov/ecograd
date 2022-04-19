import { compare } from 'bcrypt';
import { IStrategyOptions, IVerifyOptions, Strategy } from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { User } from '../../modules/database/model/user/User.model';

const opts: IStrategyOptions = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: false,
};

@autoInjectable()
export class LoginStrategy extends Strategy {
	constructor() {
		super(opts, LoginStrategy.verify);
	}

	private static async verify(
		email: string,
		password: string,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		let user = await User.findOneBy({ email });
		if (user && compare(password, user.password)) return done(null, user);

		return done(user, null);
	}
}

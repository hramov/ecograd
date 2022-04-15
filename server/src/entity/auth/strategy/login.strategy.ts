import { IStrategyOptions, IVerifyOptions, Strategy } from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { UserAccess } from '../../../modules/database/access/user.access';

const opts: IStrategyOptions = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: false,
};

@autoInjectable()
export class LoginStrategy extends Strategy {
	private static access: UserAccess;
	constructor(private readonly userAccess?: UserAccess) {
		super(opts, LoginStrategy.verify);
		LoginStrategy.access = userAccess;
	}

	private static async verify(
		email: string,
		password: string,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		const user = await LoginStrategy.access.getUserByEmailAndPassword(
			email,
			password,
		);
		return done(null, user);
	}
}

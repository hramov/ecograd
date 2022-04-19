import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IVerifyOptions } from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { User } from '../../modules/database/model/user/User.model';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
	// issuer: 'accounts.ecograd.ru',
	// audience: 'ecograd.ru',
};

@autoInjectable()
export class JWTStrategy extends Strategy {
	public static strategyName = 'user';

	constructor() {
		super(opts, JWTStrategy.verify);
	}

	public static async verify(
		jwt_payload: any,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		const user = await User.findOneBy({ id: jwt_payload.sub });
		if (!user) {
			return done(user, null);
		}
		return done(null, user);
	}
}

import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IVerifyOptions } from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { UserAccess } from '../../../modules/database/access/user.access';
import { UserNotFoundError } from '../../../modules/error/app/user-not-found.error';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
	// issuer: 'accounts.ecograd.ru',
	// audience: 'ecograd.ru',
};

@autoInjectable()
export class JWTStrategy extends Strategy {
	public static strategyName = 'JWT';
	public static access: UserAccess;

	constructor(private readonly userAccess?: UserAccess) {
		super(opts, JWTStrategy.verify);
		JWTStrategy.access = userAccess;
	}

	public static async verify(
		jwt_payload: any,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		const user = await JWTStrategy.access.getUserByID(jwt_payload.sub);
		if (user instanceof UserNotFoundError) {
			return done(user, null);
		}
		return done(null, user);
	}
}

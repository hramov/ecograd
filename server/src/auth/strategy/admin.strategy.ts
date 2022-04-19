import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IVerifyOptions } from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { Admin } from '../../modules/database/model/user/profiles/Admin.model';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
	// issuer: 'accounts.ecograd.ru',
	// audience: 'ecograd.ru',
};

@autoInjectable()
export class AdminStrategy extends Strategy {
	public static strategyName = 'JWT';

	constructor() {
		super(opts, AdminStrategy.verify);
	}

	public static async verify(
		jwt_payload: any,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		const admin = await Admin.findOneBy({ user: { id: jwt_payload.sub } });
		if (!admin) {
			return done(admin, null);
		}
		return done(null, admin);
	}
}

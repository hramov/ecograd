import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IVerifyOptions } from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { Admin } from '../../modules/database/model/user/profiles/Admin.model';
import { BadRequestError } from '../../modules/error/http/bad-request.error';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
	// issuer: 'accounts.ecograd.ru',
	// audience: 'ecograd.ru',
};

@autoInjectable()
export class AdminStrategy extends Strategy {
	public static strategyName = 'admin';

	constructor() {
		super(opts, AdminStrategy.verify);
	}

	public static async verify(
		jwt_payload: any,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		if (!jwt_payload.sub) return new Error('Token not valid');
		const admin = await Admin.findOneBy({
			user: { id: jwt_payload.sub },
		});
		if (!admin) {
			return done(admin, null);
		}
		return done(null, admin);
	}
}

import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IVerifyOptions } from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { Expert } from '../../modules/database/model/user/profiles/Expert.model';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
	// issuer: 'accounts.ecograd.ru',
	// audience: 'ecograd.ru',
};

@autoInjectable()
export class ExpertStrategy extends Strategy {
	public static strategyName = 'expert';

	constructor() {
		super(opts, ExpertStrategy.verify);
	}

	public static async verify(
		jwt_payload: any,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		if (!jwt_payload.sub) return new Error('Token not valid');
		const expert = await Expert.findOneBy({
			user: { id: jwt_payload.sub },
		});
		if (!expert) {
			return done(expert, null);
		}
		return done(null, expert);
	}
}

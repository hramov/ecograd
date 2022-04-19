import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IVerifyOptions } from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { Client } from '../../modules/database/model/user/profiles/Client.model';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
	// issuer: 'accounts.ecograd.ru',
	// audience: 'ecograd.ru',
};

@autoInjectable()
export class ClientStrategy extends Strategy {
	public static strategyName = 'client';

	constructor() {
		super(opts, ClientStrategy.verify);
	}

	public static async verify(
		jwt_payload: any,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		const client = await Client.findOneBy({
			user: { id: jwt_payload.sub },
		});
		if (!client) {
			return done(client, null);
		}
		return done(null, client);
	}
}

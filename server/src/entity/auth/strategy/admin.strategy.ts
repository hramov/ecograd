import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IVerifyOptions } from 'passport-local';
import { autoInjectable } from 'tsyringe';
import { UserAccess } from '../../../modules/database/access/user.access';
import { UserNotFoundError } from '../../../modules/error/app/user-not-found.error';
import { ROLES } from '../config';
import { Role } from '../role.entity';

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
	// issuer: 'accounts.ecograd.ru',
	// audience: 'ecograd.ru',
};

@autoInjectable()
export class AdminStrategy extends Strategy {
	public static strategyName = 'JWT';
	public static access: UserAccess;

	constructor(private readonly userAccess?: UserAccess) {
		super(opts, AdminStrategy.verify);
		AdminStrategy.access = userAccess;
	}

	public static async verify(
		jwt_payload: any,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		const user = await AdminStrategy.access.getUserByID(jwt_payload.sub);
		if (user instanceof UserNotFoundError) {
			return done(user, null);
		}

		if (user.roles.find((role: Role) => role.id === ROLES.Admin)) {
			return done(null, user);
		}
		return done(new Error('User must be an admin', null));
	}
}

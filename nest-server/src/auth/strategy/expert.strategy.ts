import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/models/user/User.model';
import { ROLES } from '../roles';

@Injectable()
export class ExpertStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: 'secret',
		});
	}

	async validate(jwt_payload: any) {
		if (!jwt_payload.sub) return new Error('Token not valid');
		const user = await User.findOne({ where: { id: jwt_payload.sub } });
		if (!user || user.profile !== ROLES.Expert) {
			return null;
		}
		return user;
	}
}

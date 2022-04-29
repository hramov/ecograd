import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/models/user/User.model';

export interface JwtPayload {
	sub: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: 'secret',
		});
	}

	async validate(jwt_payload: JwtPayload) {
		if (!jwt_payload.sub) return new Error('Token not valid');
		const user = await User.findOne({ where: { id: jwt_payload.sub } });
		if (!user) {
			return null;
		}
		return user;
	}
}

import { sign } from 'jsonwebtoken';
import { autoInjectable } from 'tsyringe';
import { UserAccess } from '../../modules/database/access/user.access';
import { Auth } from './auth.entity';
import { User } from '../../modules/database/model/User.model';

export interface JWTTokenPayload {
	sub: number;
	name: string;
	iat: number;
}
@autoInjectable()
export class AuthUseCase {
	constructor(
		private readonly auth?: Auth,
		private readonly authAccess?: UserAccess,
	) {}

	public async login(user: any): Promise<string | Error> {
		return sign({ sub: user.id, email: user.email }, 'secret');
	}

	public async register(user: User) {
		if (this.auth.isValidUser(user)) {
			return await this.authAccess.createUser(user);
		}
	}
}

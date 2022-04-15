import { sign } from 'jsonwebtoken';
import { autoInjectable } from 'tsyringe';
import { UserAccess } from '../../modules/database/access/user.access';
import { User } from '../../modules/database/model/User.model';
import { UserNotFoundError } from '../../modules/error/app/user-not-found.error';
import { ValidationError } from '../../modules/error/app/validation.error';
import { Auth } from './auth.entity';

export interface JWTTokenPayload {
	sub: string;
	name: string;
	iat: number;
}

@autoInjectable()
export class AuthUseCase {
	constructor(
		private readonly auth?: Auth,
		private readonly authAccess?: UserAccess,
	) {}

	// Public interface
	public async login(dto: any): Promise<string | Error> {
		if (this.auth.isValid(dto.email) && this.auth.isValid(dto.password)) {
			const user = await this.authAccess.getUserByEmailAndPassword(
				dto.email,
				dto.password,
			);
			if (user instanceof User) {
				return sign({ _id: user.id, email: user.email }, 'secret');
			}
			return new UserNotFoundError(dto.email);
		}
		return new ValidationError('username, password');
	}

	public async register(user: User) {
		if (this.auth.isValidUser(user)) {
			return await this.authAccess.createUser(user);
		}
	}

	public async logout(token: string) {}
}

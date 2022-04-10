import { autoInjectable } from 'tsyringe';
import { UserAccess } from '../../modules/database/access/user.access';
import { UserNotFoundError } from '../../modules/error/app/user-not-found.error';
import { ValidationError } from '../../modules/error/app/validation.error';
import { User } from '../user/user.entity';
import { Auth } from './auth.entity';
import * as jwt from 'jwt-hs256';

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
	public async login(
		username: string,
		password: string,
	): Promise<string | Error> {
		if (this.auth.isValid(username) && this.auth.isValid(password)) {
			const user = await this.authAccess.getUserByUsernameAndPassword(
				username,
				password,
			);
			if (user instanceof User) {
				return this.createToken(user);
			}
			return new UserNotFoundError(username);
		}
		return new ValidationError('username, password');
	}

	public async register(user: User) {
		if (this.auth.isValidUser(user)) {
			return await this.authAccess.createUser(user);
		}
	}

	public async logout(token: string) {}

	public async updatePassword(
		token: string,
		oldPass: string,
		newPass: string,
	) {}
	public async resetPassword(token: string) {}

	// Private realization
	private createToken(user: User): string {
		const payload: JWTTokenPayload = {
			sub: user.id,
			name: user.name,
			iat: Date.now(),
		};
		return jwt.generateHS256Token(payload, process.env.JWT_SECRET);
	}

	private toBase64(payload: string) {
		return Buffer.from(payload).toString('base64');
	}
	private async checkIfTokenExpired(token: string): Promise<boolean> {
		return true;
	}
	private async updateToken(): Promise<string> {
		return '';
	}
}

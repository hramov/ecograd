import { TokenNotValidError } from '../../modules/error/app/token-not-valid.error';
import { JWTTokenPayload } from '../auth/auth.use-case';
import { User } from './user.entity';
import * as jwt from 'jwt-hs256';
import { UserAccess } from '../../modules/database/access/user.access';

export class UserUseCase {
	constructor(private readonly userAccess?: UserAccess) {}
	public async getUserInfo(
		token: string,
	): Promise<User | TokenNotValidError> {
		if (jwt.verifyHS256Token(token, process.env.JWT_SECRET)) {
			const user = jwt.extractHS256Token<JWTTokenPayload>(
				token,
				process.env.JWT_SECRET,
			);
			return await this.userAccess.getUserByID(user.sub);
		}
		return new TokenNotValidError();
	}
}

import { sign } from 'jsonwebtoken';
import { autoInjectable } from 'tsyringe';
import { UserAccess } from '../../modules/database/access/user.access';
import { Auth } from './auth.entity';
import { User } from '../../modules/database/model/user/User.model';
import { Admin } from '../../modules/database/model/user/Admin.model';
import { Client } from '../../modules/database/model/user/Client.model';
import { Expert } from '../../modules/database/model/user/Expert.model';
import { UserDto } from './dto/user.dto';

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

	public async register(user: UserDto, profile: Admin | Client | Expert) {
		return await this.authAccess.create(user, profile);
	}
}

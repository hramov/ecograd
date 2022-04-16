import { User } from '../../modules/database/model/user/User.model';

export class Auth {
	public login: string;
	public password: string;
	public token?: string;
	public user?: User;

	public isValid<T>(field: T) {
		return true;
	}

	public isValidUser(user: User) {
		return true;
	}
}

import { Role } from '../auth/role.entity';

export class User {
	id: string;
	username: string;
	password: string;
	name: string;
	email: string;
	phone: string;
	roles: Role[];
}

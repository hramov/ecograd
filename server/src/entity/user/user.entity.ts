import { Role } from '../auth/role.entity';

export class User {
	id?: number;
	password: string;
	name: string;
	email: string;
	roles: Role[];
}

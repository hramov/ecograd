import { RoleDto } from './role.dto';

export class RegisterDto {
	_id: number;
	email: string;
	password: string;
	name: string;
	roles: RoleDto[];
}

import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	Min,
	MinLength,
} from 'class-validator';
import { ROLES } from 'src/auth/roles';

export class CreateUserDto {
	id: number;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MinLength(5)
	password: string;

	@IsNotEmpty()
	@IsString()
	@IsEnum(ROLES)
	profile: ROLES;
}

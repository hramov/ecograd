import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
	@IsNotEmpty()
	@IsEmail()
	@MaxLength(255)
	email: string;

	@IsNotEmpty()
	@MinLength(5)
	password: string;
}

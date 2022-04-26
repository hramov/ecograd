import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

export class LoginDto {
	@IsNotEmpty()
	@IsEmail()
	@Max(255)
	email: string;

	@IsNotEmpty()
	@Min(5)
	password: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	feedback: string;
}

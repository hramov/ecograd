import { IsNotEmpty, IsString } from 'class-validator';

export class AttachDto {
	id: number;

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	path: string;

	is_new: boolean;
}

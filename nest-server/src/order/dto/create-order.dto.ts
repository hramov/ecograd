import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	exp_type: number;

	@IsNotEmpty()
	@IsString()
	object_type: number;

	@IsNotEmpty()
	@IsString()
	docs_cipher: string;

	@IsNotEmpty()
	@IsString()
	rii_cipher: string;
}

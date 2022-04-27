import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	exp_type: string;

	@IsNotEmpty()
	object_type: string;

	@IsNotEmpty()
	@IsString()
	docs_cipher: string;

	@IsNotEmpty()
	@IsString()
	rii_cipher: string;
}

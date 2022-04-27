import {
	IsNotEmpty,
	IsPhoneNumber,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class AdminDto {
	id: number;
}

export class ClientDto {
	id: number;

	@IsNotEmpty()
	@IsString()
	// @IsPhoneNumber()
	@MinLength(10)
	@MaxLength(12)
	phone: string;
}

export class ExpertDto {
	id: number;

	@IsNotEmpty()
	@IsString()
	// @IsPhoneNumber()
	@MinLength(10)
	@MaxLength(12)
	phone: string;

	@IsNotEmpty()
	@IsString()
	position: string;

	@IsNotEmpty()
	@IsString()
	certificate: string;

	@IsNotEmpty()
	@IsString()
	direction: string;

	@IsString()
	misc: string;
}

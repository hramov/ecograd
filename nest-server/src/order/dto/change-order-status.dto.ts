import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChangeOrderStatusDto {
	@IsNotEmpty()
	order_id: number;

	@IsNotEmpty()
	@IsString()
	status: string;
}

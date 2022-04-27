import { IsNotEmpty, IsNumber } from 'class-validator';

export class UploadInquireDto {
	@IsNotEmpty()
	@IsNumber()
	order_id: number;
}

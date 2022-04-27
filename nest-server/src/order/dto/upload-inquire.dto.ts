import { IsNotEmpty } from 'class-validator';

export class UploadInquireDto {
	@IsNotEmpty()
	order_id: string;
}

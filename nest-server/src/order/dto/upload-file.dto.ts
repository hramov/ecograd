import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto {}

export class UploadFileForSectionDto {
	@IsNotEmpty()
	@IsString()
	order_id: number;

	@IsNotEmpty()
	@IsString()
	section_id: number;
}

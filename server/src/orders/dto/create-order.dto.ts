import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  id: number;
  // @IsString({ message: 'Should be a string' })
  object: string;

  // @IsNumber({ allowNaN: false }, { message: 'Should be a number (1 or 2)' })
  object_type: 1 | 2;

  isDocs: boolean;
  docsUrl: string;
  status: 'new' | 'inWork' | 'done';
}

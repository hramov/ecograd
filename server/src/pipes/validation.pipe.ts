import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const obj = plainToClass(metadata.metatype, value);
      const errors = await validate(obj);

      if (errors.length) {
        let message = errors.map((err) => {
          return `${err.property} - ${Object.values(err.constraints).join(
            ',',
          )}`;
        });
        throw new HttpException(message, HttpStatus.OK);
      }
      return value;
    } catch (err) {
      throw new ValidationException(['Validation exception']);
    }
  }
}

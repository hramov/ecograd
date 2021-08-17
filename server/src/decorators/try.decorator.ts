import { ValidationErrorItem } from 'sequelize/types';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export function Try(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (err) {
      if (err.sql) throw new BadRequestException(err.original.toString())
      throw new InternalServerErrorException(err.original.toString());
    }
  };
}

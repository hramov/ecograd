import {
  IsString,
  IsPhoneNumber,
  IsDate,
  Length,
  IsNumber,
  IsDateString,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Should be a string' })
  readonly last_name?: string;

  @IsString({ message: 'Should be a string' })
  readonly name: string;

  @IsString({ message: 'Should be a string' })
  readonly second_name?: string;

  @IsPhoneNumber('RU', { message: 'Should be a phone number' })
  readonly phone: string;

  @IsString()
  readonly birth_date?: Date;

  @IsEmail({}, { message: 'Should be a string' })
  readonly email: string;

  @IsString({ message: 'Should be a string' })
  @Length(5, 15, {
    message: 'Password length must be between 5 and 15 letters',
  })
  readonly password: string;
}

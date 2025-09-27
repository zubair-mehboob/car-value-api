import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

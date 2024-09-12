import { IsEmail } from 'class-validator';

export class RecoverPasswordDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}

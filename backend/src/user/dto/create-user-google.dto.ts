import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserGoogleDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  name: string;
}

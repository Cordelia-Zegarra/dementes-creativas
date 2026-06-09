import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsString()
  captcha?: string;
}

export class PasswordStrengthDto {
  password: string;
  strength: 'weak' | 'medium' | 'strong';
  score: number;
}

import { IsString, MinLength, IsOptional } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  captcha?: string;
}

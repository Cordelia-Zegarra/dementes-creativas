import { IsString, IsNumber, IsOptional, IsPositive, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNumber()
  @IsPositive()
  oldPrice: number;

  @IsNumber()
  @IsPositive()
  currentPrice: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  category?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}

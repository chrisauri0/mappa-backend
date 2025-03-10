import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  name_plan?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsString()
  status?: 'available' | 'unavailable';
}

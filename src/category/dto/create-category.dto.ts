// create-category.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;
}
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  
  @ApiPropertyOptional({
    description: 'Full address text',
    example: '123 Green Road, Dhanmondi, Dhaka, Bangladesh',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

// address.dto.ts
export class UpdateAddressDto {
  @ApiProperty({
    description: 'Full address text',
    example: '123 Green Road, Dhanmondi, Dhaka, Bangladesh',
  })
  @IsString()
  @IsNotEmpty()
  address?: string;
  
}
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop',
    description: 'Product name',
  })
  name: string;

  @ApiProperty({
    example: '1200',
    description: 'Product price',
  })
  price: string;

  @ApiPropertyOptional({
    example: 10,
    description: 'Available product stock',
  })
  stock?: number;
}

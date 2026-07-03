import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsPositive, IsOptional } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    description: 'Product ID to add to cart',
    example: 3,
  })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    description: 'User ID who owns the cart',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiPropertyOptional({
    description: 'Quantity of the product to add',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;
}
import { CartService } from './cart.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AddToCartDto } from './dto/add-to-cart.dto';

@ApiTags('Cart')
@ApiBearerAuth('bearer')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  @ApiOperation({ summary: 'Add product to cart through cart service' })
  @ApiBody({ type: AddToCartDto })
  @ApiCreatedResponse({ description: 'Product successfully added to cart' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid, or expired bearer token',
  })
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get cart items for a user' })
  @ApiOkResponse({ description: 'Cart items retrieved successfully' })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid, or expired bearer token',
  })
  async getCartItems(@Query('userId') userId: string) {
    return this.cartService.getCartItems(userId);
  }
}
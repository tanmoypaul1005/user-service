import { CartService } from './cart.service';
import { Body, Controller, Get, Post, UseGuards,Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminGuard } from '../auth/admin.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';

@ApiTags('Products')
@ApiBearerAuth('bearer')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    @ApiOperation({ summary: 'Add product to cart through cart service' })
    @ApiBody({ type: AddToCartDto })
    async addToCart(@Body() addToCartDto: AddToCartDto) {
        return this.cartService.addToCart(addToCartDto);
    }
}

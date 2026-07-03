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
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@ApiBearerAuth('bearer')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create product through product service' })
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ description: 'Product created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid, or expired bearer token',
  })
  @ApiForbiddenResponse({ description: 'Only admin can create products' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products through product service' })
  @ApiOkResponse({ description: 'List of all products' })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid, or expired bearer token',
  })
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID through product service' })
  @ApiOkResponse({ description: 'Product details' })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid, or expired bearer token',
  })
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }
}

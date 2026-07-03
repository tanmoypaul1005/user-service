import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    return lastValueFrom(
      this.productClient.send('product.create', createProductDto),
    );
  }

  async getAllProducts() {
    return lastValueFrom(this.productClient.send('product.getAll', {}));
  }
}

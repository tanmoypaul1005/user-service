import {
  BadGatewayException,
  Inject,
  Injectable,
  Optional,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @Optional()
    @Inject('PRODUCT_SERVICE')
    private readonly productClient: ClientProxy | null,
    @Inject('RABBITMQ_ENABLED') private readonly rabbitMqEnabled: boolean,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      return await lastValueFrom(
        this.productClient!.send('product.create', createProductDto),
      );
    } catch {
      throw new ServiceUnavailableException(
        'Unable to reach product service via RabbitMQ.',
      );
    }
  }

  async getAllProducts() {
    try {
      return await lastValueFrom(this.productClient!.send('product.getAll', {}));
    } catch {
      throw new ServiceUnavailableException(
        'Unable to reach product service via RabbitMQ.',
      );
    }
  }

  async getProductById(id: number) {
    try {
      return await lastValueFrom(this.productClient!.send('product.getById', id));
    } catch(error) {
      throw new ServiceUnavailableException(
        error?.message || 'Unable to reach product service via RabbitMQ.',
      );
    }
}
}
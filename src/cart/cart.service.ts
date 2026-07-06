import {
  Inject,
  Injectable,
  Optional,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @Optional()
    @Inject('PRODUCT_SERVICE')
    private readonly productClient: ClientProxy | null,
    @Inject('RABBITMQ_ENABLED') private readonly rabbitMqEnabled: boolean,
  ) { }

  async addToCart(addToCartDto: AddToCartDto) {
    try {
      return await lastValueFrom(
        this.productClient!.send('cart.addToCart', addToCartDto),
      );

    } catch (error) {
      throw new ServiceUnavailableException(
        'Unable to reach product service via RabbitMQ.',
      );
    }
  }
}
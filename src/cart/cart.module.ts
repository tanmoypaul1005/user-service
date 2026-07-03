import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_SERVICE',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'product_queue', // আপনার actual queue name
            queueOptions: { durable: false },
          },
        }),
      },
    ]),
  ],
  controllers: [CartController],
  providers: [
    CartService,
    PrismaService,
    {
      provide: 'RABBITMQ_ENABLED',
      useValue: true,
    },
  ],
})
export class CartModule {}
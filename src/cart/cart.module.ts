import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from '../prisma.service';

const rabbitMqEnabled = process.env.RABBITMQ_ENABLED === 'true';

@Module({
  imports: [
    ...(rabbitMqEnabled
      ? [
          ClientsModule.registerAsync([
            {
              name: 'PRODUCT_SERVICE',
              useFactory: () => ({
                transport: Transport.RMQ,
                options: {
                  urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
                  queue: process.env.PRODUCT_RABBITMQ_QUEUE ?? 'product_queue',
                  queueOptions: {
                    durable: true,
                  },
                },
              }),
            },
          ]),
        ]
      : []),
  ],
  controllers: [CartController],
  providers: [
    CartService,
    PrismaService,
    {
      provide: 'RABBITMQ_ENABLED',
      useValue: rabbitMqEnabled,
    },
  ],
})
export class CartModule {}
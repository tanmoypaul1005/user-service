import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

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
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'RABBITMQ_ENABLED',
      useValue: rabbitMqEnabled,
    },
  ],
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
  controllers: [BrandController],
  providers: [
    BrandService,
    PrismaService,
    {
      provide: 'RABBITMQ_ENABLED',
      useValue: rabbitMqEnabled,
    },
  ],
})
export class BrandModule {}

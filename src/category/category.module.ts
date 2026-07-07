import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma.service';

const rabbitMqEnabled = process.env.RABBITMQ_ENABLED === 'true';

@Module({
  imports: [
    ...(rabbitMqEnabled
      ? [
          ClientsModule.registerAsync([
            {
              name: 'CATEGORY_SERVICE',
              useFactory: () => ({
                transport: Transport.RMQ,
                options: {
                  urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
                  queue: process.env.CATEGORY_RABBITMQ_QUEUE ?? 'category_queue',
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
  controllers: [CategoryController],
  providers: [
    CategoryService,
    PrismaService,
    {
      provide: 'RABBITMQ_ENABLED',
      useValue: rabbitMqEnabled,
    },
  ],
})
export class CategoryModule {}
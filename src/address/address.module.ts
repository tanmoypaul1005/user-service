import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PrismaService } from '../prisma.service';

const rabbitMqEnabled = process.env.RABBITMQ_ENABLED === 'true';

@Module({
  imports: [
    ...(rabbitMqEnabled
      ? [
          ClientsModule.registerAsync([
            {
              name: 'ORDER_SERVICE',
              useFactory: () => ({
                transport: Transport.RMQ,
                options: {
                  urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
                  queue: process.env.ORDER_RABBITMQ_QUEUE ?? 'order_queue',
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
  controllers: [AddressController],
  providers: [
    AddressService,
    PrismaService,
    {
      provide: 'RABBITMQ_ENABLED',
      useValue: rabbitMqEnabled,
    },
  ],
})
export class AddressModule {}
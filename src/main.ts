import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('User and product gateway API')
    .setVersion('1.0')
    .addServer('http://localhost:3001', 'Local API Gateway')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'bearer',
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  const rabbitMqUrl = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';
  const queue = process.env.RABBITMQ_QUEUE ?? 'user_queue';
  const rabbitMqEnabled = process.env.RABBITMQ_ENABLED === 'true';

  if (rabbitMqEnabled) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMqUrl],
        queue,
        queueOptions: {
          durable: true,
        },
        noAck: false,
      },
    });

    await app.startAllMicroservices();
  }

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

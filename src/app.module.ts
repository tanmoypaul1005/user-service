import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [PrismaModule, ProductModule, UserModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

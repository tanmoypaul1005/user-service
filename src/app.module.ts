import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { AddressModule } from './address/address.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [PrismaModule, ProductModule, UserModule, CartModule, AddressModule, CategoryModule, BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

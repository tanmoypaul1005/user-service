import { Inject, Injectable, Optional } from '@nestjs/common';
import { CreateBrandDto } from './dto/create.brand.dto';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()

export class BrandService {
    
    constructor(
        @Optional()
        @Inject('PRODUCT_SERVICE')
        private readonly productClient: ClientProxy | null,
        @Inject('RABBITMQ_ENABLED') private readonly rabbitMqEnabled: boolean,
    ) { }


    async createBrand(data: CreateBrandDto) {
        return await lastValueFrom(this.productClient!.send('brand.createBrand', data));
    }

}

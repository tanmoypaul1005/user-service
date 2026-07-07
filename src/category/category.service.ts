import { Inject, Injectable, Optional } from '@nestjs/common';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()

export class CategoryService {
    constructor(
        @Optional()
        @Inject('PRODUCT_SERVICE')
        private readonly productClient: ClientProxy | null,
        @Inject('RABBITMQ_ENABLED') private readonly rabbitMqEnabled: boolean,
    ) { }

    async getAllCategories() {
        try {
            return await lastValueFrom(this.productClient!.send("category.getAllCategories",{}));
        } catch (error) {
            throw error;
        }
    }

    
}

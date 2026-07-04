import { Inject, Injectable, Optional } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AddressService {
    constructor(
        @Optional()
        @Inject('ORDER_SERVICE')
        private readonly orderClient: ClientProxy | null,
        @Inject('RABBITMQ_ENABLED') private readonly rabbitMqEnabled: boolean,
    ) { }

    async createAddress(address: string) {
        return this.orderClient!.send('address.create', { address });
    }
}

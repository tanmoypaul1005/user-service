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

    async getAllAddress(){
        return this.orderClient!.send('address.getAll', {});
    }

    async updateAddress(id: string, address: string) {
        return this.orderClient!.send('address.update', { id, address });
    }

    async deleteAddress(id: string) {
        return this.orderClient!.send('address.delete', { id });
    }
}

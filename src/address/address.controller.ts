import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { AddToCartDto } from '../cart/dto/add-to-cart.dto';

@ApiTags('Cart')
@ApiBearerAuth('bearer')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post()
     @ApiBody({ type: AddToCartDto })
    async createAddress(@Body() createAddressDto: { address: string }) {
        return this.addressService.createAddress(createAddressDto.address);
    }
}

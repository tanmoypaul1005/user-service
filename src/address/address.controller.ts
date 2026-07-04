import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/add-to-cart.dto';

@ApiTags('Cart')
@ApiBearerAuth('bearer')
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post()
     @ApiBody({ type: CreateAddressDto })
    async createAddress(@Body() createAddressDto: { address: string }) {
        return this.addressService.createAddress(createAddressDto.address);
    }

    @Get()
    async getAllAddresses() {
        return this.addressService.getAllAddress();
    }
}

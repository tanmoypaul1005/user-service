import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/add.address.dto';

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

    @Patch(':id')
    @ApiParam({ name: 'id', description: 'Address ID (UUID)', example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
    @ApiBody({ type: CreateAddressDto })
    async updateAddress(
        @Param('id') id: string,
        @Body() updateAddressDto: { address: string },
    ) {
        return this.addressService.updateAddress(id, updateAddressDto.address);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', description: 'Address ID (UUID)', example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
    async deleteAddress(@Param('id') id: string) {
        return this.addressService.deleteAddress(id);
    }
    
}

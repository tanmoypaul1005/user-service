import { Controller, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create.brand.dto';    
import { ApiBody } from '@nestjs/swagger';
@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) { }

    @Post()
    @ApiBody({ type: CreateBrandDto })
    async createBrand(data: CreateBrandDto) {
        return await this.brandService.createBrand(data);
    }
}

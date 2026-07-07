import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Post()
    @ApiBody({ type: CreateCategoryDto })
    async createCategory(@Body() data: CreateCategoryDto) {
        return this.categoryService.createCategory({ name: data.name });
    }
}

import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({ description: 'User created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid request body' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        const { email, password, role, name } = createUserDto;
        return this.userService.createUser(email, password, role, name);
    }

}

import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiBody({ type: LoginUserDto })
    @ApiOkResponse({ description: 'Login successful and bearer token returned' })
    @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        return this.userService.loginUser(email, password);
    }

}

import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '@prisma/client';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }
    @Post()
    async createUser(@Body() createUserDto: { email: string; password: string; role: Role; name: string }) {
        const { email, password, role, name } = createUserDto;
        return this.userService.createUser(email, password, role, name);
    }

}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma :PrismaService) {}

    async createUser(email: string, password: string , role: Role , name: string , ) {
        return this.prisma.user.create({
            data: {
                email,
                password,
                role,
                name,
            },
        });
    }

    async
}

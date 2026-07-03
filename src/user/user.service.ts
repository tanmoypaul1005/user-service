import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(email: string, password: string, role: Role, name: string,) {

        const hashedPassword = await bcrypt.hash(password, 10);

        if (await this.prisma.user.findUnique({ where: { email } })) {
            throw new Error('User with this email already exists');
        }

        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
                name,
            },
        });
    }

    async loginUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return user;
    }
}

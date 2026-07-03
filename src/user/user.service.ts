import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { createHmac } from 'crypto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(email: string, password: string, role: Role, name: string,) {

        const hashedPassword = await bcrypt.hash(password, 10);

        if (await this.prisma.user.findUnique({ where: { email } })) {
            throw new ConflictException('User with this email already exists');
        }

       const user= await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
                name,
            },
        });

        return {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
        };
    }

    async loginUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.createAccessToken({
            sub: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            accessToken: `${token}`,
        };
    }

    private createAccessToken(payload: Record<string, unknown>) {
        const header = this.base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
        const body = this.base64UrlEncode({
            ...payload,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        });
        const unsignedToken = `${header}.${body}`;
        const secret = process.env.JWT_SECRET ?? 'local-dev-secret';
        const signature = createHmac('sha256', secret)
            .update(unsignedToken)
            .digest('base64url');

        return `${unsignedToken}.${signature}`;
    }

    private base64UrlEncode(value: Record<string, unknown>) {
        return Buffer.from(JSON.stringify(value)).toString('base64url');
    }
}

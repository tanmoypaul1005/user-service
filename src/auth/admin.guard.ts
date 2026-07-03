import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';

type AccessTokenPayload = {
  role?: Role;
  exp?: number;
};

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getBearerToken(request);
    const payload = this.verifyToken(token);

    if (payload.role !== Role.ADMIN) {
      throw new ForbiddenException('Only admin can create products');
    }

    return true;
  }

  private getBearerToken(request: Request) {
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    return authorization.slice('Bearer '.length);
  }

  private verifyToken(token: string): AccessTokenPayload {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new UnauthorizedException('Invalid bearer token');
    }

    const [header, body, signature] = parts;
    const unsignedToken = `${header}.${body}`;
    const secret = process.env.JWT_SECRET ?? 'local-dev-secret';
    const expectedSignature = createHmac('sha256', secret)
      .update(unsignedToken)
      .digest('base64url');

    if (!this.signaturesMatch(signature, expectedSignature)) {
      throw new UnauthorizedException('Invalid bearer token');
    }

    let payload: AccessTokenPayload;

    try {
      payload = JSON.parse(
        Buffer.from(body, 'base64url').toString('utf8'),
      ) as AccessTokenPayload;
    } catch {
      throw new UnauthorizedException('Invalid bearer token');
    }

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      throw new UnauthorizedException('Bearer token expired');
    }

    return payload;
  }

  private signaturesMatch(signature: string, expectedSignature: string) {
    const signatureBuffer = Buffer.from(signature);
    const expectedSignatureBuffer = Buffer.from(expectedSignature);

    return (
      signatureBuffer.length === expectedSignatureBuffer.length &&
      timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
    );
  }
}

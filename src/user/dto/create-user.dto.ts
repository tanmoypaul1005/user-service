import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Unique user email address',
  })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'User password',
  })
  password: string;

  @ApiProperty({
    enum: Role,
    example: Role.USER,
    description: 'User role',
  })
  role: Role;

  @ApiProperty({
    example: 'John Doe',
    description: 'User display name',
  })
  name: string;
}

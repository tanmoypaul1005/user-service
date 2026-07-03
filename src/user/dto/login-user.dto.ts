import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Registered user email address',
  })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'User password',
  })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Sebastiao' })
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'sebastiao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'senha123' })
  @IsNotEmpty()
  registration: string;
}

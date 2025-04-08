import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Sebastiao' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'sebastiao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'A1B1C1' })
  @IsNotEmpty()
  registration: string;
}

export class LoginDto {
  @ApiProperty({ example: 'sebastiao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsNotEmpty()
  password: string;
}

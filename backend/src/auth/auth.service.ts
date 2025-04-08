// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashed,
      },
    });

    const { password, id, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token: this.generateToken(user),
    };
  }

  async login(data: LoginDto) {
    console.log(data);

    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const { password, id, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token: this.generateToken(user),
    };
  }

  private generateToken(user: Omit<User, 'password'>) {
    return this.jwt.sign({ sub: user.id, email: user.email });
  }
}

// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(registration: string) {
    const user = await this.prisma.user.findUnique({ where: { registration } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async update(registration: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { registration },
      data,
    });
  }

  async delete(registration: string) {
    return this.prisma.user.delete({
      where: { registration },
    });
  }
}

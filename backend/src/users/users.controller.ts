// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':registration')
  getById(@Param('registration') registration: string) {
    return this.usersService.findOne(registration);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Put(':registration')
  update(
    @Param('registration') registration: string,
    @Body() body: Partial<CreateUserDto>,
  ) {
    return this.usersService.update(registration, body);
  }

  @Delete(':registration')
  remove(@Param('registration') registration: string) {
    return this.usersService.delete(registration);
  }
}

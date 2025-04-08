// src/users/users.controller.ts
import { Controller, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Usuários listados com sucesso' })
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Lista um usuario' })
  @ApiResponse({ status: 200, description: 'Usuário listado com sucesso' })
  @Get(':registration')
  getById(@Param('registration') registration: string) {
    return this.usersService.findOne(registration);
  }

  @ApiOperation({ summary: 'Edita um usuario' })
  @ApiResponse({ status: 200, description: 'Usuário editado com sucesso' })
  @Put(':registration')
  update(
    @Param('registration') registration: string,
    @Body() body: Partial<CreateUserDto>,
  ) {
    return this.usersService.update(registration, body);
  }

  @ApiOperation({ summary: 'Remove um usuario' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @Delete(':registration')
  remove(@Param('registration') registration: string) {
    return this.usersService.delete(registration);
  }
}

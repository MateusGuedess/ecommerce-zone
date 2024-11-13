import { Prisma, User as UserModel } from '.prisma/client';
import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  async getUser(
    @Param('id') id: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel> {
    return this.userService.find({ id: Number(id) });
  }

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: Prisma.UserWhereUniqueInput,
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: id,
      data: userData,
    });
  }
}

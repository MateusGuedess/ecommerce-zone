import { Prisma, User as UserModel } from '.prisma/client';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(
    @Param('id') id: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel> {
    return this.userService.find({ id: Number(id) });
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id') id: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel> {
    return this.userService.deleteUser({
      id: Number(id),
    });
  }
}

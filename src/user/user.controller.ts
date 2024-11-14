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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
type UserType = Promise<Omit<UserModel, 'password' | 'id'>>;
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userData: Prisma.UserCreateInput): UserType {
    const { password, id, ...user } =
      await this.userService.createUser(userData);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: Prisma.UserWhereUniqueInput): UserType {
    return this.userService.find({ id: Number(id) });
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Omit<UserModel, 'id' | 'password'>[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: Prisma.UserWhereUniqueInput) {
    this.userService.deleteUser({
      id: Number(id),
    });
  }
}

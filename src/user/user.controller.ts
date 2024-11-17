import { Prisma, User as UserModel } from '.prisma/client';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
type UserType = Promise<Omit<UserModel, 'password' | 'id'>>;

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  })
  async createUser(@Body() userData: Prisma.UserCreateInput): UserType {
    const { password, id, ...user } =
      await this.userService.createUser(userData);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
    },
  })
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: Prisma.UserWhereUniqueInput): UserType {
    return this.userService.find({ id: Number(id) });
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({ status: 200, description: 'Users found' })
  @ApiResponse({ status: 404, description: 'Users not found' })
  @ApiBody({
    schema: {
      type: 'object',
    },
  })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Omit<UserModel, 'id' | 'password'>[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  })
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: Prisma.UserWhereUniqueInput,
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: +id },
      data: userData,
    });
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: Prisma.UserWhereUniqueInput) {
    this.userService.deleteUser({
      id: Number(id),
    });
  }
}

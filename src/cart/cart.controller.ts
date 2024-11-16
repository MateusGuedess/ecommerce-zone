import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Prisma } from '@prisma/client';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() body: Prisma.CartCreateInput) {
    return this.cartService.create(body);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Prisma.CartWhereUniqueInput) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: Prisma.CartWhereUniqueInput,
    @Body() data: Prisma.CartUpdateInput,
  ) {
    return this.cartService.update({ where: id, data });
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.CartWhereUniqueInput) {
    return this.cartService.remove({ id: +id });
  }
}

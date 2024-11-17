import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { Prisma } from '@prisma/client';

@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body() body: Prisma.CartItemsCreateInput) {
    return this.cartItemService.create(body);
  }

  @Get()
  findAll() {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Prisma.CartItemsWhereUniqueInput) {
    return this.cartItemService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: Prisma.CartItemsWhereUniqueInput,
    @Body() data: Prisma.CartItemsUpdateInput,
  ) {
    return this.cartItemService.update({ where: { id: +id }, data });
  }

  @Delete(':id')
  remove(@Param('id') where: Prisma.CartItemsWhereUniqueInput) {
    return this.cartItemService.remove(where);
  }
}

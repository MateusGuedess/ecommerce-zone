import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItems, Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() body: { quantity: number; productId: number },
    @Request() req: any,
  ) {
    const userId = +req.sub;
    return this.cartItemService.create(body, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    const userId = +req.sub;
    return this.cartItemService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: Prisma.CartItemsWhereUniqueInput,
  ): Promise<CartItems> {
    return this.cartItemService.update({
      where: { id: +id },
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') where: Prisma.CartItemsWhereUniqueInput) {
    return this.cartItemService.remove(where);
  }
}

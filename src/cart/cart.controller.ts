import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findOrCreateCart(@Request() req: any) {
    const userId = +req.sub;
    return this.cartService.findOrCreateCart(userId);
  }
}

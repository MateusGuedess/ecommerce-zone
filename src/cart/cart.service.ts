import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateCart(userId: number): Promise<Cart> {
    console.log('userID: ', userId);
    const existingCart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        cartItems: true,
      },
    });

    if (existingCart) {
      return existingCart;
    }

    return this.prisma.cart.create({
      data: {
        userId,
      },
    });
  }
}

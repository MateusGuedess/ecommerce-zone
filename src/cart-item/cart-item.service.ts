import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: { quantity: number; productId: number }, userId: number) {
    let existingCart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!existingCart) {
      existingCart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    return this.prisma.cartItems.upsert({
      where: {
        cartId_productId: {
          cartId: existingCart.id,
          productId: data.productId,
        },
      },
      create: {
        quantity: data.quantity,
        cart: {
          connect: {
            userId,
          },
        },
        product: {
          connect: {
            sku: data.productId,
          },
        },
      },
      update: {
        quantity: {
          increment: data.quantity,
        },
      },
    });
  }

  async findAll(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });
    console.log('CART ', cart, userId);
    return this.prisma.cartItems.findMany({
      where: {
        cartId: cart.id,
      },
    });
  }

  async update(params: { where: Prisma.CartItemsWhereUniqueInput }) {
    const { where } = params;

    const cartItem = await this.prisma.cartItems.findUnique({
      where,
    });

    if (!cartItem) {
      throw new NotFoundException('CartItem not found');
    }

    if (cartItem.quantity <= 1) {
      return this.prisma.cartItems.delete({
        where,
      });
    }

    return this.prisma.cartItems.update({
      where,
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  }

  async remove(where: Prisma.CartItemsWhereUniqueInput) {
    this.prisma.cartItems.delete({
      where,
    });
  }
}

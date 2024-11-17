import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrderWithTransaction(userId: number) {
    return this.prisma.$transaction(async (trx) => {
      const cart = await trx.cart.findUnique({
        where: {
          userId,
        },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart || cart.cartItems.length === 0) {
        throw new Error('Cart is empty');
      }

      for (const cartItem of cart.cartItems) {
        if (cartItem.product.stock < cartItem.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${cartItem.product.name}`,
          );
        }
      }

      const order = await trx.order.create({
        data: {
          userId,
          orderItems: {
            create: cart.cartItems.map((cartItem) => ({
              productId: cartItem.productId,
              quantity: cartItem.quantity,
            })),
          },
        },
      });

      for (const cartItem of cart.cartItems) {
        await this.prisma.product.update({
          where: {
            sku: cartItem.productId,
          },
          data: {
            stock: {
              decrement: cartItem.quantity,
            },
          },
        });
      }

      await trx.cartItems.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      return order;
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(where: Prisma.OrderWhereUniqueInput) {
    return this.prisma.order.findUnique({
      where,
    });
  }
}

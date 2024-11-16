import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CartItemsCreateInput) {
    return this.prisma.cartItems.create({
      data,
    });
  }

  findAll() {
    return this.prisma.cartItems.findMany();
  }

  findOne(where: Prisma.CartItemsWhereUniqueInput) {
    return this.prisma.cartItems.findUnique({
      where,
    });
  }

  update(params: {
    where: Prisma.CartItemsWhereUniqueInput;
    data: Prisma.CartItemsUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.cartItems.update({
      where,
      data,
    });
  }

  remove(where: Prisma.CartItemsWhereUniqueInput) {
    this.prisma.cartItems.delete({
      where,
    });
  }
}

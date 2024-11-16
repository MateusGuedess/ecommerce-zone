import { Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  create(body: Prisma.CartCreateInput): Promise<Cart> {
    return this.prisma.cart.create({
      data: body,
    });
  }

  findAll(): Promise<Cart[]> {
    return this.prisma.cart.findMany();
  }

  findOne(where: Prisma.CartWhereUniqueInput): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where,
    });
  }

  update(params: {
    where: Prisma.CartWhereUniqueInput;
    data: Prisma.CartUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.cart.update({
      where,
      data,
    });
  }

  remove(id: Prisma.CartWhereUniqueInput) {
    return this.prisma.cart.delete({
      where: id,
    });
  }
}

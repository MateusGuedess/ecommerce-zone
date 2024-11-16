import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  create(body: Prisma.OrderCreateInput) {
    return this.prisma.order.create({
      data: body,
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

  update(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }): Promise<Order> {
    const { where, data } = params;
    return this.prisma.order.update({
      where,
      data,
    });
  }

  remove(where: Prisma.OrderWhereUniqueInput) {
    return this.prisma.order.delete({
      where,
    });
  }
}

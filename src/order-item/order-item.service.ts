import { Injectable } from '@nestjs/common';
import { OrderItems, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.OrderItemsCreateInput) {
    return this.prisma.orderItems.create({
      data,
    });
  }

  findAll(): Promise<OrderItems[]> {
    return this.prisma.orderItems.findMany();
  }

  findOne(
    where: Prisma.OrderItemsWhereUniqueInput,
  ): Promise<OrderItems | null> {
    return this.prisma.orderItems.findUnique({ where });
  }

  update(params: {
    where: Prisma.OrderItemsWhereUniqueInput;
    data: Prisma.OrderItemsUpdateInput;
  }): Promise<OrderItems> {
    const { where, data } = params;
    return this.prisma.orderItems.update({
      where,
      data,
    });
  }

  remove(where: Prisma.OrderItemsWhereUniqueInput) {
    this.prisma.orderItems.delete({
      where,
    });
  }
}

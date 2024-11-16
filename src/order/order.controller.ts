import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() body: Prisma.OrderCreateInput) {
    return this.orderService.create(body);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') where: Prisma.OrderWhereUniqueInput) {
    return this.orderService.findOne(where);
  }

  @Patch(':id')
  update(
    @Param('id') where: Prisma.OrderWhereUniqueInput,
    @Body() data: Prisma.OrderCreateInput,
  ) {
    return this.orderService.update({ where, data });
  }

  @Delete(':id')
  remove(@Param('id') where: Prisma.OrderWhereUniqueInput) {
    return this.orderService.remove(where);
  }
}

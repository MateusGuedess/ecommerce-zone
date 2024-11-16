import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { Prisma } from '@prisma/client';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() body: Prisma.OrderItemsCreateInput) {
    return this.orderItemService.create(body);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Prisma.OrderItemsWhereUniqueInput) {
    return this.orderItemService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: Prisma.OrderItemsWhereUniqueInput,
    @Body() data: Prisma.OrderItemsUpdateInput,
  ) {
    return this.orderItemService.update({ where: id, data });
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.OrderItemsWhereUniqueInput) {
    return this.orderItemService.remove({ id: +id });
  }
}

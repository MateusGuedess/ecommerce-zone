import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('purchase')
  async purchase(@Request() req: any) {
    const userId = req.sub;
    return this.orderService.createOrderWithTransaction(userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any) {
    const userId = req.sub;
    return this.orderService.findAll(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') where: Prisma.OrderWhereUniqueInput) {
    return this.orderService.findOne(where);
  }
}

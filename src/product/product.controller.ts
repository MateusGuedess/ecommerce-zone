import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: Prisma.ProductCreateInput) {
    return this.productService.create(body);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':sku')
  async findOne(@Param('sku') sku: Prisma.ProductWhereUniqueInput) {
    return this.productService.findOne({ sku: +sku });
  }

  @Patch(':sku')
  async update(
    @Param('sku') sku: Prisma.ProductWhereUniqueInput,
    @Body() body: Prisma.ProductUpdateInput,
  ) {
    return this.productService.update({ where: { sku: +sku }, data: body });
  }

  @Delete(':sku')
  async remove(@Param('sku') sku: Prisma.ProductWhereUniqueInput) {
    return this.productService.remove(sku);
  }
}

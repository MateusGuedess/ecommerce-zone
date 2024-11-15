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
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() body: Prisma.ProductCreateInput) {
    return this.productService.create(body);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':sku')
  findOne(@Param('sku') sku: Prisma.ProductWhereUniqueInput) {
    return this.productService.findOne(sku);
  }

  @Patch(':sku')
  update(
    @Param('sku') sku: Prisma.ProductWhereUniqueInput,
    @Body() body: Prisma.ProductUpdateInput,
  ) {
    return this.productService.update(sku, body);
  }

  @Delete(':sku')
  remove(@Param('sku') sku: Prisma.ProductWhereUniqueInput) {
    return this.productService.remove(sku);
  }
}

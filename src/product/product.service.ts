import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(sku: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.findUnique({ where: sku });
  }

  update(sku: Prisma.ProductWhereUniqueInput, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({ where: sku, data });
  }

  remove(sku: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.delete({ where: sku });
  }
}

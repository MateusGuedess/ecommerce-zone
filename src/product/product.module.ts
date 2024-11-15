import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, AuthGuard],
})
export class ProductModule { }

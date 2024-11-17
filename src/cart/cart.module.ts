import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [CartService, AuthGuard],
})
export class CartModule { }

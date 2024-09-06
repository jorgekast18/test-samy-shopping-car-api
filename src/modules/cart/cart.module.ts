import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema/cart.schema';
import { ProductsModule } from '../products/products.module';
import { BillModule } from '../bill/bill.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema}
    ]),
    ProductsModule,
    BillModule
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}

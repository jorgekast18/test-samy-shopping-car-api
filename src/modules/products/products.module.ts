import { Module } from '@nestjs/common';
import { Product, ProductSchema, ProductType, ProductTypeSchema } from './product.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: ProductType.name, schema: ProductTypeSchema}
        ])
    ]
})
export class ProductsModule {}

import { Module } from '@nestjs/common';
import { Product, ProductSchema, ProductType, ProductTypeSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { ProductTypesController } from './produtc-type.controller';
import { ProductTypeService } from './product-type.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: ProductType.name, schema: ProductTypeSchema}
        ]),
    ],
    providers: [ProductService, ProductTypeService],
    controllers: [ProductsController, ProductTypesController],
    exports: [ProductService, ProductTypeService]
})
export class ProductsModule {}

import { Schema, Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';

@NestSchema()
export class ProductType extends Document {
    @Prop({ required: true })
    name: string
}

export type ProductDocument = Product & Document;
export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);

@NestSchema()
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: false})
    description: string;

    @Prop({ required: false})
    location: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number

    @Prop({ type: Schema.Types.ObjectId, ref: 'ProductType', required: true })
    productType: ProductType;
}

export type ProductTypeDocument = ProductType & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
import { Schema, Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { CartState } from '../dto/cart-state.enum';
import { ProductCartDto } from '../dto/product-cart.dto';

@NestSchema()
export class Cart extends Document {
    @Prop({ required: true })
    items: ProductCartDto[];

    @Prop({ 
        type: String,
        enum: CartState,
        default: CartState.EMPTY
    })
    state: string;

    @Prop({ default: Date.now})
    createdAt: Date;
}

export type CartDocument = Cart & Document;
export const ProductSchema = SchemaFactory.createForClass(Cart);
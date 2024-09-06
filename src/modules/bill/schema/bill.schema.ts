import { Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { ProductCartDto } from 'src/modules/cart/dto/product-cart.dto';

@NestSchema()
export class Bill extends Document {
    @Prop({ required: true, default: [] })
    products: ProductCartDto[];

    @Prop({ 
        type: String,
        default: ''
    })
    clientName: string;

    @Prop({ default: Date.now})
    createdAt: Date;
}

export type BillDocument = Bill & Document;
export const BillSchema = SchemaFactory.createForClass(Bill);
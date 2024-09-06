import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schema/cart.schema';
import { I18nService } from 'nestjs-i18n';
import { Model } from 'mongoose';
import { CartDto } from './dto/cart.dto';
import { ResponseApiDto } from 'src/common/dto/response-api.dto';
import { ok } from 'assert';
import { ProductCartDto } from './dto/product-cart.dto';
import { ProductService } from '../products/product.service';
import { Product } from '../products/schemas/product.schema';
import { canAddQuantityProductInCart, getIndexIfProductExistInCart } from './utils/utils-cart';
import { CartState } from './dto/cart-state.enum';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
        private readonly i18n: I18nService,
        private readonly productService: ProductService
    ) {}

    async create(): Promise<ResponseApiDto>{
        const createdCart = new this.cartModel();
        createdCart.save();
        
        const response: ResponseApiDto = {
            ok: true,
            message: 'cartCreatedSuccess',
            data: createdCart
        }
        return response;
    }

    async findAll(): Promise<Cart[]> {
        return this.cartModel.find().exec();
    }

    async findOne(id: string): Promise<Cart> {
        const cart = await this.cartModel.findById(id).exec();

        if(!cart){
            throw new NotFoundException(`${this.i18n.translate('cartNotFound')}}`)
        }
        return cart;
    }

    async update(id: string, cartDto: CartDto): Promise<ResponseApiDto> {
        const updatedCart = await this.cartModel
          .findByIdAndUpdate(id, cartDto, { new: true })
          .exec();
        if (!updatedCart) {
          throw new NotFoundException(`${this.i18n.translate('productNotFound')}`);
        }
        const response: ResponseApiDto = {
          ok: true,
          statusCode: 200,
          message: `${this.i18n.translate('upadtedProduct')}`,
          data: updatedCart
        }
        return response;
    }

    async addProduct(cartId: string, productCartToAdd: ProductCartDto): Promise<ResponseApiDto> {
        const cart: Cart = await this.findOne(cartId);
        const productInDb: Product = await this.productService.findOne(productCartToAdd.productId); 
        const total = productCartToAdd.quantity * productCartToAdd.price;

        cart.state = CartState.FULL;
        
        // Validate if product exist in cart by index in array items of cart
        const indexProduct = getIndexIfProductExistInCart(cart, productCartToAdd);
        
        // Validate if can add quantity of product to add
        if(!canAddQuantityProductInCart(productCartToAdd, cart.items[indexProduct], productInDb))
            throw new BadRequestException(`${this.i18n.translate('insufficientsProducts')}`);

        // If exist product in cart, sum quantity to product to add to product in cart
        if(indexProduct > -1){
            cart.items[indexProduct].quantity += productCartToAdd.quantity;
            cart.items[indexProduct].total = cart.items[indexProduct].quantity * cart.items[indexProduct].price;
            await this.update(cartId, cart);
        }else {
            const productCart = {
                ...productCartToAdd,
                total
            }
            cart.items.push(productCart);
            await this.update(cartId, cart);
        }

        const response: ResponseApiDto = {
            ok: true,
            statusCode: 200,
            message: `${this.i18n.translate('productAddedSuccess')}`,
            data: cart
          }
        return response;
    }
}

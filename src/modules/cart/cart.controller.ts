import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { ResponseApiDto } from 'src/common/dto/response-api.dto';
import { CartDto } from './dto/cart.dto';
import { Cart } from './schema/cart.schema';
import { ProductCartDto } from './dto/product-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    @ApiOperation({ summary: 'Crear el carrito de compras para luego agregar productos.'})
    @ApiResponse({ status: 201, description: 'Carrito creado correctamente.', type: CartDto})
    async create(): Promise<ResponseApiDto>{
        return this.cartService.create();
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los carritos de compras'})
    @ApiResponse({ status: 200, description: 'Lista de todos los carritos de compra.', type: [CartDto]})
    async findAll(): Promise<Cart[]> {
        return this.cartService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un carrito por el id'})
    @ApiResponse({ status: 200, description: 'Carrito de compras obtenido por el id', type:CartDto})
    @ApiResponse({ status: 400, description: 'El carrito de compras no existe'})
    async findOne(@Param('id') id: string): Promise<Cart> {
        return this.cartService.findOne(id);
    }

    @Patch('add-product/:id')
    @ApiOperation({ summary: 'Agregar un producto al carrito, si el producto ya existe se actualiza la cantidad.'})
    @ApiResponse({ status: 201, description: 'Producto agregado correctamente.', type: CartDto})
    async addProduct(@Body() productCartDto: ProductCartDto, @Param('id') cartId: string): Promise<ResponseApiDto> {
        return this.cartService.addProduct(cartId, productCartDto);
    }

    @Patch('decrease-product/:id')
    @ApiOperation({ summary: 'Decrementa un producto del carrito. Si la cantidad queda en 0, elimina el producto del carrito.'})
    @ApiResponse({ status: 201, description: 'Producto decrementado del carrito correctamente.', type: CartDto})
    async decreaseProduct(@Body() productId: string, @Param('id') cartId: string): Promise<ResponseApiDto> {
        return this.cartService.decreaseProductInCart(cartId, productId);
    }

    @Patch('remove-product/:id')
    @ApiOperation({ summary: 'Elimina un producto del carrito.'})
    @ApiResponse({ status: 201, description: 'Producto eliminado del carrito correctamente.', type: CartDto})
    async removeProduct(@Body() productId: string, @Param('id') cartId: string): Promise<ResponseApiDto> {
        return this.cartService.removeProduct(cartId, productId);
    }

    @Patch('finished/:id')
    @ApiOperation({ summary: 'Cerrar un carrito de compra, cambia de estado para indicar que ya fue pagado y se convierte en factura'})
    @ApiResponse({ status: 201, description: 'Carrito finalizado correctamente', type: CartDto})
    async finishedCart(@Param('id') cartId: string): Promise<ResponseApiDto> {
        return this.cartService.finishedCart(cartId);
    }

}

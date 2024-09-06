import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCartDto } from './product-cart.dto';
import { CartState } from './cart-state.enum';

export class CartDto {
    @ApiProperty({
      description: 'Listado de productos del carrito',
      example: ProductCartDto,
    })
    @IsOptional()
    items?: ProductCartDto[];
  
    @ApiProperty({
      description: 'Estado del carrito de compras. "Full": Lleno, "Empty": Vacio, "Finished": Terminado.',
      example: "Finished",
    })
    @IsOptional()
    @IsEnum(CartState)
    state?: String;

    @ApiProperty({ description: 'Fecha de creación del carrito de compras.', example: '2024-09-06' })
    @IsOptional()
    createdAt?: Date;

}
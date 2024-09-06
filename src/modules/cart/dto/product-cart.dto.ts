import { IsNotEmpty, IsNumber, IsMongoId, Min, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCartDto {
    @ApiProperty({
      description: 'ID del producto que se va a agregar al carrito o modificar.',
      example: '60b8d295f1a2c34c7d1e8c4e',
    })
    @IsNotEmpty({ message: 'productIdRequired'})
    @IsMongoId({ message: 'mustBeValidId'})
    productId: string;
  
    @ApiProperty({
      description: 'Cantidad del producto agregado al carrito de compras.',
      example: 4,
    })
    @IsNotEmpty({ message: 'productPriceRequired'})
    @IsNumber({ }, { message: 'mustBeNumber'})
    @Min(0, { message: 'minValueZero'})
    quantity: number;

    @ApiProperty({ description: 'Precio del producto', example: 100 })
    @IsNotEmpty({ message: 'productPriceRequired'})
    @IsNumber({ }, { message: 'mustBeNumber'})
    @Min(0, { message: 'minValueZero'})
    price: number;

    @ApiProperty({ description: 'Total del valor del producto.', example: 100 })
    @ValidateIf((value) => value.total !== undefined, { message: 'fieldForbidden'})
    total?: number;
}
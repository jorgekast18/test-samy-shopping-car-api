import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCartDto } from 'src/modules/cart/dto/product-cart.dto';

export class BillDto {
    @ApiProperty({
      description: 'Id de la factura.',
      example: '9847398ujoiuhds90',
    })
    @IsOptional()
    @IsMongoId()
    id?: string;
  
    @ApiProperty({
      description: 'Listado de proudctos que pertenecen a la factura.',
      example: [ProductCartDto],
    })
    @IsOptional()
    products?: ProductCartDto[]

    @ApiProperty({
        description: 'Nombre del cliente',
        example: 'Juan Lozano',
      })
    @IsOptional()
    @IsString()
    clientName?: string;

    @ApiProperty({ description: 'Fecha de creación del carrito de compras.', example: '2024-09-06' })
    @IsOptional()
    createdAt?: Date;

}
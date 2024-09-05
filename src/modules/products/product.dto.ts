import { IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';

export class CreateProductDto {
    constructor(private readonly i18n: I18nService) {}

    @ApiProperty({ description: 'Nombre del tipo de producto', example: 'Gafas de sol' })
    @IsNotEmpty({ message: 'productNameRequired' })
    name: string;

    @ApiProperty({ description: 'Descripción del tipo de producto', example: 'Gafas para protegerse del sol' })
    description: string;

    @ApiProperty({ description: 'Ubicación del evento', example: 'Madrid' })
    location: string;

    @ApiProperty({ description: 'Precio del producto', example: 100 })
    @IsNotEmpty({ message: 'productPriceRequired'})
    @IsNumber()
    price: number;

    @ApiProperty({ description: 'Cantidad de unidades en inventario', example: 100 })
    @IsNotEmpty({ message: 'stockRequired'})
    @IsNumber()
    stock: number;

    @ApiProperty({ description: 'ID del tipo de producto', example: '60b8d295f1a2c34c7d1e8c4e' })
    @IsNotEmpty()
    @IsMongoId()
    typeProduct: string;
}

export class UpdateProductDto {
    @ApiProperty({ description: 'Nombre del tipo de producto', example: 'Gafas de sol' })
    name: string;

    @ApiProperty({ description: 'Descripción del tipo de producto', example: 'Gafas para protegerse del sol' })
    description?: string;

    @ApiProperty({ description: 'Ubicación del evento', example: 'Madrid' })
    location?: string;

    @ApiProperty({ description: 'Precio del producto', example: 100 })
    @IsNumber()
    price?: number;

    @ApiProperty({ description: 'Cantidad de unidades en inventario', example: 100 })
    @IsNumber()
    stock?: number;

    @ApiProperty({ description: 'ID del tipo de producto', example: '60b8d295f1a2c34c7d1e8c4e' })
    @IsMongoId()
    typeProduct?: string;
}
import { IsNotEmpty, IsNumber, IsMongoId, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: 'Nombre del producto', example: 'Gafas de sol' })
    @IsNotEmpty({ message: 'productNameRequired' })
    name: string;

    @ApiProperty({ description: 'Descripción del tipo de producto', example: 'Gafas para protegerse del sol' })
    description: string;

    @ApiProperty({ description: 'Ubicación del evento', example: 'Madrid' })
    location: string;

    @ApiProperty({ description: 'Precio del producto', example: 100 })
    @IsNotEmpty({ message: 'productPriceRequired'})
    @IsNumber({ }, { message: 'mustBeNumber'})
    @Min(0, { message: 'minValueZero'})
    price: number;

    @ApiProperty({ description: 'Cantidad de unidades en inventario', example: 100 })
    @IsNotEmpty({ message: 'stockRequired'})
    @Min(0, { message: 'minValueZero'})
    @IsNumber({ }, { message: 'mustBeNumber'})
    stock: number;

    @ApiProperty({ description: 'ID del tipo de producto', example: '60b8d295f1a2c34c7d1e8c4e' })
    @IsNotEmpty({ message: 'productTypeRequired'})
    @IsMongoId({ message: 'mustBeValidId'})
    productType: string;
}

export class UpdateProductDto {
    @ApiProperty({ description: 'Nombre del tipo de producto', example: 'Gafas de sol' })
    name: string;

    @ApiProperty({ description: 'Descripción del tipo de producto', example: 'Gafas para protegerse del sol' })
    description?: string;

    @ApiProperty({ description: 'Ubicación del evento', example: 'Madrid' })
    location?: string;

    @ApiProperty({ description: 'Precio del producto', example: 100 })
    @Min(0, { message: 'minValueZero'})
    @IsNumber({ }, { message: 'mustBeNumber'})
    price?: number;

    @ApiProperty({ description: 'Cantidad de unidades en inventario', example: 100 })
    @Min(0, { message: 'minValueZero'})
    @IsNumber({ }, { message: 'mustBeNumber'})
    stock?: number;

    @ApiProperty({ description: 'ID del tipo de producto', example: '60b8d295f1a2c34c7d1e8c4e' })
    @IsMongoId({ message: 'mustBeValidId'})
    productType?: string;
}

export class CreateProductTypeDto {

    @ApiProperty({ description: 'Nombre del tipo de producto', example: 'Evento' })
    @IsNotEmpty({ message: 'productTypeNameRequired' })
    name: string;
}
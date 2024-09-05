import { IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'ID del tipo de producto', example: '60b8d295f1a2c34c7d1e8c4e' })
  @IsNotEmpty()
  @IsMongoId()
  typeProduct: string;

  @ApiProperty({ description: 'Nombre del tipo de producto', example: 'Gafas de sol' })
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio'})
  name: string;

  @ApiProperty({ description: 'Cantidad total del producto', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;
}

export class UpdateProductDto {
  @ApiProperty({ description: 'ID del tipo de producto', example: '60b8d295f1a2c34c7d1e8c4e' })
  @IsMongoId()
  typeProduct?: string;

  @ApiProperty({ description: 'Cantidad total del producto', example: 100 })
  @IsNumber()
  totalAmount?: number;
}
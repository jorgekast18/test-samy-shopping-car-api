import { Body, Controller, Get, Post, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/product.dto';
import { ProductType } from './schemas/product.schema';
import { ResponseApiDto } from 'src/common/dto/response-api.dto';

@ApiTags('Products Types')
@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de producto' })
  @ApiResponse({ status: 201, description: 'Tipo de producto creado exitosamente.', type: ProductType })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  async create(@Body() createProductTypeDto: CreateProductTypeDto): Promise<ResponseApiDto> {
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de producto' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de producto', type: [ProductType] })
  async findAll(): Promise<ProductType[]> {
    return this.productTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de producto por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de producto encontrado.', type: ProductType })
  @ApiResponse({ status: 404, description: 'Tipo de producto no encontrado.' })
  async findOne(@Param('id') id: string): Promise<ProductType> {
    return this.productTypeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de producto por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de producto actualizado.', type: ProductType })
  @ApiResponse({ status: 404, description: 'Tipo de producto no encontrado.' })
  async update(@Param('id') id: string, @Body() updateProductTypeDto: CreateProductTypeDto): Promise<ResponseApiDto> {
    return this.productTypeService.update(id, updateProductTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de producto por ID' })
  @ApiResponse({ status: 204, description: 'Tipo de producto eliminado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.productTypeService.remove(id);
  }
}
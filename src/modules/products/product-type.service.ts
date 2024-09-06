import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductType, ProductTypeDocument } from './schemas/product.schema';
import { I18nService } from 'nestjs-i18n';
import { CreateProductTypeDto } from './dto/product.dto';
import { ResponseApiDto } from 'src/common/dto/response-api.dto';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductType.name) private productTypeModel: Model<ProductTypeDocument>,
    private readonly i18n: I18nService
  ) {}

  async create(createProductTypeDto: CreateProductTypeDto): Promise<ResponseApiDto> {
    const createdProductType = new this.productTypeModel(createProductTypeDto);
    try {
      createdProductType.save();
      const response: ResponseApiDto = {
        ok: true,
        statusCode: 201,
        message: `${this.i18n.translate('createdProductTypeSuccess')}`,
        data: createdProductType
      }
      
      return response
    } catch (error){
      console.log('Error during create product type ', error);
    }
    
  }

  async findAll(): Promise<ProductType[]> {
    return this.productTypeModel.find().exec();
  }

  async findOne(id: string): Promise<ProductType> {
    const productType = await this.productTypeModel.findById(id).exec();
    if (!productType) {
      throw new NotFoundException(`${this.i18n.translate('productTypeNotFound')}`);
    }
    return productType;
  }

  async update(id: string, updateProductTypeDto: CreateProductTypeDto): Promise<ResponseApiDto> {
    const updatedProductType = await this.productTypeModel
      .findByIdAndUpdate(id, updateProductTypeDto, { new: true })
      .exec();
    if (!updatedProductType) {
      throw new NotFoundException(`${this.i18n.translate('productTypeNotFound')}`);
    }
    const response: ResponseApiDto = {
      ok: true,
      statusCode: 200,
      message: `${this.i18n.translate('upadtedProduct')}`,
      data: updatedProductType
    }
    return response;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productTypeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`${this.i18n.translate('productTypeNotFound')}`);
    }
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductType, ProductTypeDocument } from './schemas/product.schema';
import { CreateProductTypeDto } from './dto/product.dto';

@Injectable()
export class ProductTypeService {
  constructor(@InjectModel(ProductType.name) private productTypeModel: Model<ProductTypeDocument>) {}

  async create(createProductTypeDto: CreateProductTypeDto): Promise<ProductType> {
    const createdProductType = new this.productTypeModel(createProductTypeDto);
    return createdProductType.save();
  }

  async findAll(): Promise<ProductType[]> {
    return this.productTypeModel.find().exec();
  }

  async findOne(id: string): Promise<ProductType> {
    const productType = await this.productTypeModel.findById(id).exec();
    if (!productType) {
      throw new NotFoundException(`ProductType with ID ${id} not found`);
    }
    return productType;
  }

  async update(id: string, updateProductTypeDto: CreateProductTypeDto): Promise<ProductType> {
    const updatedProductType = await this.productTypeModel
      .findByIdAndUpdate(id, updateProductTypeDto, { new: true })
      .exec();
    if (!updatedProductType) {
      throw new NotFoundException(`ProductType with ID ${id} not found`);
    }
    return updatedProductType;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productTypeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`ProductType with ID ${id} not found`);
    }
  }
}
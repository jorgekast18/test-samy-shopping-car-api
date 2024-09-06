import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { I18nService } from 'nestjs-i18n';
import { ResponseApiDto } from 'src/common/dto/response-api.dto';

@Injectable()
export class ProductService {
  constructor(

        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        private readonly i18n: I18nService
    ) {}

  async create(createProductDto: CreateProductDto): Promise<ResponseApiDto> {
    const createdProduct = new this.productModel(createProductDto);
    try {
        createdProduct.save();
        const response: ResponseApiDto = {
            ok: true,
            statusCode: 201,
            message: `${this.i18n.translate('createdProductSuccess')}`,
            data: createProductDto
        }

        return response;
    } catch (error){
      console.log('Error during create product ', error);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`${this.i18n.translate('productNotFound')}`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ResponseApiDto> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`${this.i18n.translate('productNotFound')}`);
    }
    const response: ResponseApiDto = {
      ok: true,
      statusCode: 200,
      message: `${this.i18n.translate('upadtedProduct')}`,
      data: updatedProduct
    }
    return response;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`${this.i18n.translate('productNotFound')}`);
    }
  }
}
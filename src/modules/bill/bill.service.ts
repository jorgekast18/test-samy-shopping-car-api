import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bill, BillDocument } from './schema/bill.schema';
import { I18nService } from 'nestjs-i18n';
import { Model } from 'mongoose';
import { BillDto } from './dto/bill.dto';
import { ResponseApiDto } from 'src/common/dto/response-api.dto';

@Injectable()
export class BillService {
    constructor(
        @InjectModel(Bill.name) private billModel: Model<BillDocument>,
        private readonly i18n: I18nService
    ) {}

    async findAll(): Promise<Bill[]> {
        return this.billModel.find().exec();
    }

    async create(billDto: BillDto): Promise<ResponseApiDto>{
        const createdBill = new this.billModel(billDto);
        try {
            createdBill.save();
            const response: ResponseApiDto = {
                ok: true,
                statusCode: 201,
                message: `${this.i18n.translate('createdBillSuccess')}`,
                data: createdBill
            }
    
            return response;
        } catch (error){
          console.log('Error during create bill ', error);
        }
    }
}

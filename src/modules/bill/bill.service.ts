import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bill, BillDocument } from './schema/bill.schema';
import { I18nService } from 'nestjs-i18n';
import { Model } from 'mongoose';

@Injectable()
export class BillService {
    constructor(
        @InjectModel(Bill.name) private billModel: Model<BillDocument>,
        private readonly i18n: I18nService
    ) {}

    async findAll(): Promise<Bill[]> {
        return this.billModel.find().exec();
    }
}

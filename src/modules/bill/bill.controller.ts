import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { Bill } from './schema/bill.schema';

@ApiTags('Bill')
@Controller('bill')
export class BillController {
    constructor(private readonly billService: BillService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las facturas'})
    @ApiResponse({ status: 200, description: 'Listado de facturas', type: Bill})
    async findAll(): Promise<Bill[]> {
        return this.billService.findAll();
    }
}

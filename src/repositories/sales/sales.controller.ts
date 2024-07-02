import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ReportsResponseDto } from '../../reports/dto';
// eslint-disable-next-line prettier/prettier
import {
  GetSalesDto,
  SaleRespondeDto,
} from './dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-study.dto';
import { SalesService } from './sales.service';

@ApiTags('sale')
@Controller('sales')
export class SalesController {
  constructor(private readonly studiesService: SalesService) {}

  @Post()
  @ApiResponse({
    type: SaleRespondeDto,
  })
  create(@Body() createDto: CreateSaleDto) {
    return this.studiesService.create(createDto);
  }

  @Get()
  @ApiResponse({
    type: SaleRespondeDto,
    isArray: true,
  })
  findAll(@Query() data: GetSalesDto) {
    return this.studiesService.findAll(data);
  }

  @Get('resports')
  @ApiResponse({
    type: ReportsResponseDto,
  })
  async generateReport(@Query() data: GetSalesDto) {
    console.log('resports');
    return await this.studiesService.getReportSales(data);
  }

  @Get(':id')
  @ApiResponse({
    type: SaleRespondeDto,
  })
  findOne(@Param('id') id: string) {
    return this.studiesService.findOne(+id);
  }

  @Get('resport/:id')
  @ApiResponse({
    type: ReportsResponseDto,
  })
  async generatePdf(@Param('id') id: string) {
    console.log('resport/:id');
    return await this.studiesService.getPDF(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: SaleRespondeDto,
  })
  update(@Param('id') id: string, @Body() updateDto: UpdateSaleDto) {
    return this.studiesService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: SaleRespondeDto,
  })
  remove(@Param('id') id: string) {
    return this.studiesService.remove(+id);
  }
}

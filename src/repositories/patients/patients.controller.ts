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

// eslint-disable-next-line prettier/prettier
import {
  GetPatientsDto,
  PatientRespondeDto,
} from './dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientsService } from './patients.service';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiResponse({
    type: PatientRespondeDto,
  })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiResponse({
    type: PatientRespondeDto,
    isArray: true,
  })
  findAll(@Query() data: GetPatientsDto) {
    return this.patientsService.findAll(data);
  }

  @Get(':id')
  @ApiResponse({
    type: PatientRespondeDto,
  })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Get('/document/:document')
  @ApiResponse({
    type: PatientRespondeDto,
  })
  findOneByDocument(@Param('document') document: string) {
    return this.patientsService.findByIdDocument(document);
  }

  @Patch(':id')
  @ApiResponse({
    type: PatientRespondeDto,
  })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: PatientRespondeDto,
  })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}

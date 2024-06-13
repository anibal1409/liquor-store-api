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
  GetStudiesDto,
  StudyRespondeDto,
} from './dto';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { StudiesService } from './studies.service';

@ApiTags('studies')
@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Post()
  @ApiResponse({
    type: StudyRespondeDto,
  })
  create(@Body() createStudyDto: CreateStudyDto) {
    return this.studiesService.create(createStudyDto);
  }

  @Get()
  @ApiResponse({
    type: StudyRespondeDto,
    isArray: true,
  })
  findAll(@Query() data: GetStudiesDto) {
    return this.studiesService.findAll(data);
  }

  @Get(':id')
  @ApiResponse({
    type: StudyRespondeDto,
  })
  findOne(@Param('id') id: string) {
    return this.studiesService.findOne(+id);
  }

  // @Get(':id/pdf')
  // async generateStudyPDF(@Param('id') id: string, @Res() res: Response) {
  //   return this.studiesService.generatePDF(+id, res);
  // }

  @Get('resport/:id')
  @ApiResponse({
    type: ReportsResponseDto,
  })
  async generatePdf(@Param('id') id: string) {
    return await this.studiesService.getPDF(+id);
    // res.setHeader('Content-Type', 'application/pdf');
    // res.send(pdfBuffer);
  }

  @Patch(':id')
  @ApiResponse({
    type: StudyRespondeDto,
  })
  update(@Param('id') id: string, @Body() updateStudyDto: UpdateStudyDto) {
    return this.studiesService.update(+id, updateStudyDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: StudyRespondeDto,
  })
  remove(@Param('id') id: string) {
    return this.studiesService.remove(+id);
  }
}

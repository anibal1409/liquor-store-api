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
  ExamRespondeDto,
  GetExamsDto,
} from './dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamsService } from './exams.service';

@ApiTags('exams')
@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @ApiResponse({
    type: ExamRespondeDto,
  })
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }

  @Get()
  @ApiResponse({
    type: ExamRespondeDto,
    isArray: true,
  })
  findAll(@Query() data: GetExamsDto) {
    return this.examsService.findAll(data);
  }

  @Get(':id')
  @ApiResponse({
    type: ExamRespondeDto,
  })
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: ExamRespondeDto,
  })
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(+id, updateExamDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: ExamRespondeDto,
  })
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }
}

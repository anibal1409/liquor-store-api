import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TypesExamRespondeDto } from './dto';
import { CreateTypesExamDto } from './dto/create-types-exam.dto';
import { UpdateTypesExamDto } from './dto/update-types-exam.dto';
import { TypesExamsService } from './types-exams.service';

@ApiTags('types-exams')
@Controller('types-exams')
export class TypesExamsController {
  constructor(private readonly typesExamsService: TypesExamsService) {}

  @Post()
  @ApiResponse({
    type: TypesExamRespondeDto,
  })
  create(@Body() createTypesExamDto: CreateTypesExamDto) {
    return this.typesExamsService.create(createTypesExamDto);
  }

  @Get()
  @ApiResponse({
    type: TypesExamRespondeDto,
    isArray: true,
  })
  findAll() {
    return this.typesExamsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: TypesExamRespondeDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.typesExamsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    type: TypesExamRespondeDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTypesExamDto: UpdateTypesExamDto,
  ) {
    return this.typesExamsService.update(+id, updateTypesExamDto);
  }

  @Delete(':id')
  @ApiResponse({
    type: TypesExamRespondeDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.typesExamsService.remove(+id);
  }
}

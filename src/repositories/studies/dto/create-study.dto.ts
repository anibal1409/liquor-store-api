import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { IdCreateEntity } from '../../base/id.create';
import { Study } from '../entities';
import { StageStudy } from '../enums';
import { CreateStudyExamDto } from './create-study-exam.dto';

export class CreateStudyDto extends PartialType(
  OmitType(Study, [
    'updatedAt',
    'createdAt',
    'deleted',
    'patient',
    'status',
    'studyExams',
  ]),
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  stage!: StageStudy;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date!: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  sendEmail!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total!: number;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  patient: IdCreateEntity;

  @ApiProperty({ type: [CreateStudyExamDto] })
  @ArrayNotEmpty()
  @Type(() => CreateStudyExamDto)
  studyExams: CreateStudyExamDto[];
}

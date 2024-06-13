import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  ArrayNotEmpty,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Patient } from '../../patients/entities';
import { Study } from '../entities';
import { StageStudy } from '../enums';
import { CreateStudyExamDto } from './create-study-exam.dto';

export class StudyRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

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

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Patient)
  patient: Patient;

  @ApiProperty({ type: [CreateStudyExamDto] })
  @ArrayNotEmpty()
  @Type(() => CreateStudyExamDto)
  studyExams: CreateStudyExamDto[];

  constructor(data: Study) {
    this.id = data.id;
    this.stage = data.stage as StageStudy;
    this.date = data.date;
    this.note = data.note;
    this.sendEmail = data.sendEmail;
    this.patient = data.patient;
    this.total = data.total;
    this.studyExams = data.studyExams;
  }
}

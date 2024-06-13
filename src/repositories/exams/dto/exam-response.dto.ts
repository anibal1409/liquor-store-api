import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { TypesExam } from '../../types-exams';
import { Exam } from '../entities';

export class ExamRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  unitedCheck!: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  united?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  valuesCheck!: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  values?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => TypesExam)
  typesExam: TypesExam;

  constructor(data: Exam) {
    this.id = data.id;
    this.status = data.status;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.unitedCheck = data.unitedCheck;
    this.united = data.united;
    this.valuesCheck = data.valuesCheck;
    this.values = data.values;
    this.unitedCheck = data.unitedCheck;
    this.typesExam = data.typesExam;
  }
}

import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GenderMonthRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  male: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  female: number;

  constructor(data: any) {
    this.female = data.female;
    this.male = data.male;
  }
}

class ExamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  count: number;

  constructor(data: any) {
    this.name = data.name;
    this.count = data.count;
  }
}

export class MonthRespondeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => GenderMonthRespondeDto)
  gender: GenderMonthRespondeDto;

  @ApiProperty()
  @IsNotEmpty()
  typesExam: { [key: string]: number };

  @ApiProperty({ type: ExamDto, isArray: true })
  @IsNotEmpty()
  exams: ExamDto[];

  constructor(data: any) {
    console.log(data);
    this.gender = new GenderMonthRespondeDto(data.gender);
    this.exams = data.exams;
    this.typesExam = data.typesExam;
  }
}

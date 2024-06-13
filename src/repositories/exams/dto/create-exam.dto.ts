import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBoolean,
  IsNotEmpty,
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
import { Exam } from '../entities';

export class CreateExamDto extends PartialType(
  OmitType(Exam, ['updatedAt', 'createdAt', 'deleted', 'typesExam']),
) {
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
  status!: boolean;

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

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  typesExam: IdCreateEntity;
}

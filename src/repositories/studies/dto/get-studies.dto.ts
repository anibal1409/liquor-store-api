import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsBooleanString,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetStudiesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  status?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  PatientName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  stage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  typesExamId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  patientId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  sendEmail?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  start: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  end: string;
}

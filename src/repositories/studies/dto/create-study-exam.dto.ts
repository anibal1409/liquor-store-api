import { Type } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { IdCreateEntity } from '../../base/id.create';

export class CreateStudyExamDto extends IdCreateEntity {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  value: string;

  @ApiProperty({ type: IdCreateEntity })
  @IsNotEmpty()
  @Type(() => IdCreateEntity)
  exam: IdCreateEntity;
}

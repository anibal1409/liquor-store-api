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

import { Customer } from '../entities';

export class CustomerRespondeDto {
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
  firstName!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  idDocument!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone: string;

  constructor(data: Customer) {
    this.id = data.id;
    this.status = data.status;
    this.idDocument = data.idDocument;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.gender = data.gender;
    this.phone = data.phone;
  }
}

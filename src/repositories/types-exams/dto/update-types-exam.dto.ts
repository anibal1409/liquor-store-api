import { PartialType } from '@nestjs/swagger';
import { CreateTypesExamDto } from './create-types-exam.dto';

export class UpdateTypesExamDto extends PartialType(CreateTypesExamDto) {}

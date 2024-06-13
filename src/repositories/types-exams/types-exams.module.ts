import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypesExam } from './entities';
import { TypesExamsController } from './types-exams.controller';
import { TypesExamsService } from './types-exams.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypesExam])],
  controllers: [TypesExamsController],
  providers: [TypesExamsService],
})
export class TypesExamsModule {}

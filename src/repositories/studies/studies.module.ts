import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsModule } from '../../reports/reports.module';
// eslint-disable-next-line prettier/prettier
import {
  Study,
  StudyExams,
} from './entities';
import { StudiesController } from './studies.controller';
import { StudiesService } from './studies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Study, StudyExams]), ReportsModule],
  controllers: [StudiesController],
  providers: [StudiesService],
  exports: [StudiesService],
})
export class StudiesModule {}

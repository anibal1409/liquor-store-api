import { Module } from '@nestjs/common';

import { ExamsModule } from '../exams';
import { PatientsModule } from '../patients';
import { StudiesModule } from '../studies';
import { UsersModule } from '../users';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [UsersModule, PatientsModule, StudiesModule, ExamsModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}

import { Module } from '@nestjs/common';

import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users';
import { TypesExamsModule } from './types-exams/types-exams.module';
import { ExamsModule } from './exams/exams.module';
import { StudiesModule } from './studies/studies.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    UsersModule,
    PatientsModule,
    TypesExamsModule,
    ExamsModule,
    StudiesModule,
    StatisticsModule,
  ],
})
export class RepositoriesModule {}

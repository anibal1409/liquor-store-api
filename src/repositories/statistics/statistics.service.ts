import { Injectable } from '@nestjs/common';

import { ExamsService } from '../exams';
import { PatientsService } from '../patients/patients.service';
import { StudiesService } from '../studies';
import { UsersService } from '../users/users.service';
// eslint-disable-next-line prettier/prettier
import {
  CountersRespondeDto,
  GetStatisticsDto,
  MonthRespondeDto,
} from './dto';
import { Counters } from './entities';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly usersService: UsersService,
    private readonly studiesService: StudiesService,
    private readonly examsService: ExamsService,
  ) {}

  async counters(): Promise<CountersRespondeDto> {
    const counters = await this.getCounters();
    return new CountersRespondeDto(counters);
  }

  private async getCounters(): Promise<Counters> {
    return {
      patients: await this.patientsService.count(),
      users: await this.usersService.count(),
      studies: await this.studiesService.count(),
      exams: await this.examsService.count(),
    };
  }

  async statisticsMonth(data: GetStatisticsDto): Promise<MonthRespondeDto> {
    return new MonthRespondeDto({
      gender: await this.studiesService.generateMonthlyGenderStatistics(data),
      typesExam: await this.studiesService.generateMonthlyExamTypeStatistics(data),
      exams: await this.studiesService.generateMonthlyExamStatistics(data),
    });
  }
}

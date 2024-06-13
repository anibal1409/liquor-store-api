import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Study,
  StudyExams,
} from './entities';
import { StudiesService } from './studies.service';

describe('StudiesService', () => {
  let service: StudiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Study, StudyExams])],
      providers: [StudiesService],
    }).compile();

    service = module.get<StudiesService>(StudiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

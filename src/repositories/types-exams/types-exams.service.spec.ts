import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypesExam } from './entities';
import { TypesExamsService } from './types-exams.service';

describe('TypesExamsService', () => {
  let service: TypesExamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([TypesExam])],
      providers: [TypesExamsService],
    }).compile();

    service = module.get<TypesExamsService>(TypesExamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

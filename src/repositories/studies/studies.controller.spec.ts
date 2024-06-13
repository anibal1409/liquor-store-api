import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Study,
  StudyExams,
} from './entities';
import { StudiesController } from './studies.controller';
import { StudiesService } from './studies.service';

describe('StudiesController', () => {
  let controller: StudiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Study, StudyExams])],
      controllers: [StudiesController],
      providers: [StudiesService],
    }).compile();

    controller = module.get<StudiesController>(StudiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypesExam } from './entities';
import { TypesExamsController } from './types-exams.controller';
import { TypesExamsService } from './types-exams.service';

describe('TypesExamsController', () => {
  let controller: TypesExamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([TypesExam])],
      controllers: [TypesExamsController],
      providers: [TypesExamsService],
    }).compile();

    controller = module.get<TypesExamsController>(TypesExamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

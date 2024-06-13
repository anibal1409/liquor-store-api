// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exam } from '../../exams/entities';
import { Study } from './study.entity';

@Entity()
export class StudyExams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  value!: string;

  @ManyToOne(() => Exam, (exam) => exam.studyExams)
  exam: Exam;

  @ManyToOne(() => Study, (study) => study.studyExams)
  study: Study;
}

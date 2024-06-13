// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { IdEntity } from '../../base';
import { StudyExams } from '../../studies/entities';
import { TypesExam } from '../../types-exams';

@Entity()
export class Exam extends IdEntity {
  @Column({ nullable: false, unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  price!: number;

  @Column({ nullable: false })
  unitedCheck!: boolean;

  @Column({ nullable: true })
  united?: string;

  @Column({ nullable: false })
  valuesCheck!: boolean;

  @Column({ nullable: true })
  values?: string;

  @ManyToOne(() => TypesExam, (typesExam) => typesExam.id)
  @JoinColumn()
  typesExam?: TypesExam;

  @OneToMany(() => StudyExams, (studyExams) => studyExams.exam)
  studyExams: StudyExams[];
}

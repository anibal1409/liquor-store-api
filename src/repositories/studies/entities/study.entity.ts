// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { IdEntity } from '../../base';
import { Patient } from '../../patients';
import { StageStudy } from '../enums';
import { StudyExams } from './studyExams.entity';

@Entity()
export class Study extends IdEntity {
  @Index('study_stage_index')
  @Column({ nullable: false, default: StageStudy.Pending })
  stage!: string;

  @Column({ nullable: false })
  date!: Date;

  @Column({ nullable: true })
  note?: string;

  @Column({ nullable: false, default: false })
  sendEmail: boolean;

  @Column({ nullable: false, default: 0 })
  total: number;

  @ManyToOne(() => Patient, (patient) => patient.id)
  @JoinColumn()
  patient?: Patient;

  @OneToMany(() => StudyExams, (studyExams) => studyExams.study)
  studyExams: StudyExams[];
}

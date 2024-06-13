// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
} from 'typeorm';

import { IdEntity } from '../../base';

@Entity()
export class TypesExam extends IdEntity {
  @Column({ nullable: false, unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;
}

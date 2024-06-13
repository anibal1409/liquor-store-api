// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
} from 'typeorm';

import { IdEntity } from '../../base';

@Entity()
export class Patient extends IdEntity {
  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  idDocument!: string;

  @Column({ nullable: false })
  birthdate!: Date;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  gender: string;
}

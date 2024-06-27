// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
} from 'typeorm';

import { IdEntity } from '../../base';

@Entity()
export class Customer extends IdEntity {
  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: false })
  idDocument!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  gender: string;
}

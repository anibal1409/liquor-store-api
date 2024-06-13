import { Exclude } from 'class-transformer';
// eslint-disable-next-line prettier/prettier
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { ApiHideProperty } from '@nestjs/swagger';

import { IdEntity } from '../../base';
import { Patient } from '../../patients/entities';
import { UserRole } from '../enums';

@Entity()
export class User extends IdEntity {
  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  idDocument!: string;

  @Index('user_role_index')
  @Column({ nullable: false, default: UserRole.Patient })
  role!: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ length: 256, nullable: false })
  password!: string;

  @Column({ nullable: false })
  birthdate!: Date;

  @ManyToOne(() => Patient, (patient) => patient.id)
  @JoinColumn()
  patient?: Patient;
}

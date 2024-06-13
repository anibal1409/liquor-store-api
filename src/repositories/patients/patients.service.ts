// eslint-disable-next-line prettier/prettier
import {
  Not,
  Repository,
} from 'typeorm';

// eslint-disable-next-line prettier/prettier
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudRepository } from '../../common';
import { GetPatientsDto } from './dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientRespondeDto } from './dto/patient-response.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities';

@Injectable()
export class PatientsService implements CrudRepository<Patient> {
  constructor(
    @InjectRepository(Patient)
    private readonly repository: Repository<Patient>,
  ) {}

  async findValid(id: number): Promise<Patient> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
      relations: [],
    });
    if (!entity) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return entity;
  }

  findByIdDocument(idDocument: string, id?: number): Promise<Patient> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        idDocument,
        deleted: false,
      },
    });
  }

  async create(createDto: CreatePatientDto): Promise<PatientRespondeDto> {
    if (await this.findByIdDocument(createDto.idDocument)) {
      throw new BadRequestException('Paciente ya existe.');
    }

    const item = await this.repository.save(createDto);

    return await this.findOne(item.id);
  }

  findAll(data?: GetPatientsDto) {
    return this.repository.find({
      where: {
        deleted: false,
        status: data?.status,
        gender: data?.gender,
      },
      order: {
        lastName: 'ASC',
      },
      relations: [],
    });
  }

  async findOne(id: number): Promise<PatientRespondeDto> {
    const item = await this.findValid(id);
    return new PatientRespondeDto(item);
  }

  async update(
    id: number,
    updateDto: UpdatePatientDto,
  ): Promise<PatientRespondeDto> {
    if (await this.findByIdDocument(updateDto.idDocument, id)) {
      throw new BadRequestException('Paciente ya existe.');
    }

    const item = await this.repository.save({
      id,
      idDocument: updateDto.idDocument,
      firstName: updateDto.firstName,
      lastName: updateDto.lastName,
      status: updateDto.status,
      email: updateDto.email,
      birthdate: updateDto.birthdate,
      phone: updateDto?.phone,
      gender: updateDto.gender,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<PatientRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new PatientRespondeDto(await this.repository.save(item));
  }

  async count(): Promise<number> {
    return await this.repository.count({
      where: {
        deleted: false,
      },
    });
  }
}

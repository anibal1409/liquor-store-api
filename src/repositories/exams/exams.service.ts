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
// eslint-disable-next-line prettier/prettier
import {
  ExamRespondeDto,
  GetExamsDto,
} from './dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities';

@Injectable()
export class ExamsService implements CrudRepository<Exam> {
  constructor(
    @InjectRepository(Exam)
    private readonly repository: Repository<Exam>,
  ) {}

  async findValid(id: number): Promise<Exam> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['typesExam'],
    });
    if (!entity) {
      throw new NotFoundException('Examen no encontrado');
    }
    return entity;
  }

  findByIdName(name: string, id?: number): Promise<Exam> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateExamDto): Promise<ExamRespondeDto> {
    console.log(createDto);
    if (await this.findByIdName(createDto.name)) {
      throw new BadRequestException('Examen ya existe.');
    }

    const item = await this.repository.save({
      ...createDto,
      typesExam: { id: createDto.typesExam.id },
    });

    return await this.findOne(item.id);
  }

  findAll(data?: GetExamsDto) {
    return this.repository.find({
      where: {
        deleted: false,
        status: data?.status,
        // id: Not(data?.id || 0),
        // typesExam: {
        //   id: Not(data?.typesExamId) || 0,
        // },
        // united: Like(data?.united || '%'),
        // price:
        //   data?.price ||
        //   LessThanOrEqual(data?.lessOrEqual) ||
        //   MoreThanOrEqual(data?.moreOrequal),
        // name: Like(`%${data?.name}%` || '%'),
      },
      order: {
        name: 'ASC',
      },
      relations: ['typesExam'],
    });
  }

  async findOne(id: number): Promise<ExamRespondeDto> {
    const item = await this.findValid(id);
    return new ExamRespondeDto(item);
  }

  async update(id: number, updateDto: UpdateExamDto): Promise<ExamRespondeDto> {
    console.log(updateDto);
    
    if (await this.findByIdName(updateDto.name, id)) {
      throw new BadRequestException('Paciente ya existe.');
    }

    const item = await this.repository.save({
      id,
      description: updateDto.description,
      name: updateDto.name,
      price: updateDto.price,
      status: updateDto.status,
      typesExam: {
        id: updateDto.typesExam.id,
      },
      united: updateDto.united,
      unitedCheck: updateDto.unitedCheck,
      values: updateDto.values,
      valuesCheck: updateDto.valuesCheck,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<ExamRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new ExamRespondeDto(await this.repository.save(item));
  }

  async count(): Promise<number> {
    return await this.repository.count({
      where: {
        deleted: false,
      },
    });
  }
}

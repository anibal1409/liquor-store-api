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

import { CrudRepository } from '../../common/use-case';
import { TypesExamRespondeDto } from './dto';
import { CreateTypesExamDto } from './dto/create-types-exam.dto';
import { UpdateTypesExamDto } from './dto/update-types-exam.dto';
import { TypesExam } from './entities';

@Injectable()
export class TypesExamsService implements CrudRepository<TypesExam> {
  constructor(
    @InjectRepository(TypesExam)
    private readonly repository: Repository<TypesExam>,
  ) {}

  async findValid(id: number): Promise<TypesExam> {
    const entity = await this.repository.findOne({
      where: {
        id,
      },
      relations: [],
    });
    if (!entity) {
      throw new NotFoundException('Tipo de examen no encontrado');
    }
    return entity;
  }

  findByIdName(name: string, id?: number): Promise<TypesExam> {
    return this.repository.findOne({
      where: {
        id: Not(id || 0),
        name,
        deleted: false,
      },
    });
  }

  async create(createDto: CreateTypesExamDto): Promise<TypesExamRespondeDto> {
    if (await this.findByIdName(createDto.name)) {
      throw new BadRequestException('Tipo de examen ya existe.');
    }

    const item = await this.repository.save(createDto);

    return await this.findOne(item.id);
  }

  findAll() {
    return this.repository.find({
      where: {
        deleted: false,
      },
      order: {
        name: 'ASC',
      },
      relations: [],
    });
  }

  async findOne(id: number): Promise<TypesExamRespondeDto> {
    const item = await this.findValid(id);
    return new TypesExamRespondeDto(item);
  }

  async update(
    id: number,
    updateDto: UpdateTypesExamDto,
  ): Promise<TypesExamRespondeDto> {
    if (await this.findByIdName(updateDto.name, id)) {
      throw new BadRequestException('Tipo de examen ya existe.');
    }

    const item = await this.repository.save({
      id,
      name: updateDto.name,
      description: updateDto.description,
    });

    return this.findOne(item.id);
  }

  async remove(id: number): Promise<TypesExamRespondeDto> {
    const item = await this.findValid(id);
    item.deleted = true;
    return new TypesExamRespondeDto(await this.repository.save(item));
  }
}

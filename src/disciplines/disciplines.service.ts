import { Injectable } from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discipline } from './entities/discipline.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
  ) {}

  create(createDisciplineDto: CreateDisciplineDto) {
    return this.disciplineRepository.insert(createDisciplineDto);
  }

  findAll() {
    return this.disciplineRepository.find();
  }

  findOne(id: string) {
    return this.disciplineRepository.find({ where: { id } });
  }

  update(id: string, updateDisciplineDto: UpdateDisciplineDto) {
    return this.disciplineRepository.update(id, updateDisciplineDto);
  }

  remove(id: string) {
    return this.disciplineRepository.delete(id);
  }
}

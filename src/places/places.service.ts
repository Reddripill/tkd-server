import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

  create(createPlaceDto: CreatePlaceDto) {
    return this.placeRepository.insert(createPlaceDto);
  }

  findAll() {
    return this.placeRepository.find();
  }

  findOne(id: string) {
    return this.placeRepository.find({ where: { id } });
  }

  update(id: string, updatePlaceDto: UpdatePlaceDto) {
    return this.placeRepository.update(id, updatePlaceDto);
  }

  remove(id: string) {
    return this.placeRepository.delete(id);
  }
}

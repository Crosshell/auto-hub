import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async findByRegion(regionId: string): Promise<CityEntity[]> {
    return this.cityRepository.find({
      where: { region: { id: regionId } },
    });
  }

  async findById(id: string): Promise<CityEntity | null> {
    return this.cityRepository.findOne({ where: { id } });
  }
}

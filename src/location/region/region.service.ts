import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  async findByCountry(countryId: string): Promise<RegionEntity[]> {
    return this.regionRepository.find({
      where: { country: { id: countryId } },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarMake } from './entities/car-make.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarMakeService {
  constructor(
    @InjectRepository(CarMake)
    private readonly carMakeRepository: Repository<CarMake>,
  ) {}

  async findAll(): Promise<CarMake[]> {
    return this.carMakeRepository.find();
  }

  async findByCarModelId(id: string): Promise<CarMake> {
    const carMake = await this.carMakeRepository.findOne({
      where: { models: { id } },
    });
    if (!carMake) throw new NotFoundException('Car make not found');
    return carMake;
  }
}

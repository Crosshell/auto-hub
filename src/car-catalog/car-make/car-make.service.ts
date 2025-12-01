import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarMakeEntity } from './entities/car-make.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarMakeService {
  constructor(
    @InjectRepository(CarMakeEntity)
    private readonly carMakeRepository: Repository<CarMakeEntity>,
  ) {}

  async findAll(): Promise<CarMakeEntity[]> {
    return this.carMakeRepository.find();
  }
}

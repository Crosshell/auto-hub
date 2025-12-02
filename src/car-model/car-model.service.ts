import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModel } from './entities/car.model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarModelService {
  constructor(
    @InjectRepository(CarModel)
    private readonly carModelRepository: Repository<CarModel>,
  ) {}

  async findByCarMakeId(makeId: string): Promise<CarModel[]> {
    return this.carModelRepository.find({ where: { make: { id: makeId } } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from './entities/car.entity';
import { CarMakeEntity } from '../car-catalog/car-make/entities/car-make.entity';
import { CarModelEntity } from '../car-catalog/car-model/entities/car-model.entity';
import { CarGenerationEntity } from '../car-catalog/car-generation/entities/car-generation.entity';
import { CarModificationEntity } from '../car-catalog/car-modification/entities/car-modification.entity';
import { CreateCarInput } from './dto/create-car.input';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private carRepository: Repository<CarEntity>,

    @InjectRepository(CarMakeEntity)
    private makeRepository: Repository<CarMakeEntity>,

    @InjectRepository(CarModelEntity)
    private modelRepository: Repository<CarModelEntity>,

    @InjectRepository(CarGenerationEntity)
    private genRepository: Repository<CarGenerationEntity>,

    @InjectRepository(CarModificationEntity)
    private modRepository: Repository<CarModificationEntity>,
  ) {}

  async create(input: CreateCarInput): Promise<CarEntity> {
    const make = await this.makeRepository.findOneBy({ id: input.makeId });
    const model = await this.modelRepository.findOneBy({
      id: input.modelId,
    });
    const gen = await this.genRepository.findOneBy({
      id: input.generationId,
    });
    const mod = await this.modRepository.findOneBy({
      id: input.modificationId,
    });

    if (!make || !model || !gen || !mod) {
      throw new NotFoundException('Car catalog reference not found');
    }

    const car = this.carRepository.create({
      ...input,
      make,
      model,
      generation: gen,
      modification: mod,
    });

    return this.carRepository.save(car);
  }
}

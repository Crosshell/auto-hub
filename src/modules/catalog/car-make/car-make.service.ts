import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarMake } from './entities/car-make.entity';
import { Repository } from 'typeorm';
import { CreateCarMakeInput } from './dto/create-car-make.input';
import { CarModelService } from '../car-model/car-model.service';
import { UpdateCarMakeInput } from './dto/update-car-make.input';

@Injectable()
export class CarMakeService {
  constructor(
    @InjectRepository(CarMake)
    private readonly carMakeRepository: Repository<CarMake>,
    private readonly carModelService: CarModelService,
  ) {}

  async findAll(): Promise<CarMake[]> {
    return this.carMakeRepository.find();
  }

  async findOneById(id: string): Promise<CarMake> {
    const carMake = await this.carMakeRepository.findOne({ where: { id } });
    if (!carMake) throw new NotFoundException('Car make not found');
    return carMake;
  }

  async findByCarModelId(id: string): Promise<CarMake> {
    const carMake = await this.carMakeRepository.findOne({
      where: { models: { id } },
    });
    if (!carMake) throw new NotFoundException('Car make not found');
    return carMake;
  }

  async create(input: CreateCarMakeInput): Promise<CarMake> {
    const carMake = this.carMakeRepository.create({ name: input.name });
    await this.carMakeRepository.save(carMake);

    const createManyModelsInput = input.models.map((model) => ({
      name: model.name,
      makeId: carMake.id,
    }));
    await this.carModelService.createMany(createManyModelsInput);

    return carMake;
  }

  async update(id: string, input: UpdateCarMakeInput): Promise<CarMake> {
    await this.carMakeRepository.update(id, input);
    return this.findOneById(id);
  }
}

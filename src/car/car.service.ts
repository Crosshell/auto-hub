import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CarMake } from '../car-make/entities/car-make.entity';
import { CarModel } from '../car-model/entities/car.model.entity';
import { CreateCarInput } from './dto/create-car.input';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,

    @InjectRepository(CarMake)
    private makeRepository: Repository<CarMake>,

    @InjectRepository(CarModel)
    private modelRepository: Repository<CarModel>,
  ) {}

  async create(input: CreateCarInput): Promise<Car> {
    const make = await this.makeRepository.findOne({
      where: { id: input.makeId },
      relations: ['models'],
    });

    if (!make) throw new NotFoundException('Make not found');

    const model = await this.modelRepository.findOne({
      where: { id: input.modelId },
      relations: ['make'],
    });

    if (!model) throw new NotFoundException('Model not found');

    if (model.make.id !== make.id) {
      throw new BadRequestException('This model does not belong to this make');
    }

    const car = this.carRepository.create({
      ...input,
      make,
      model,
    });

    return this.carRepository.save(car);
  }

  async findOneById(id: string): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id } });
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }
}

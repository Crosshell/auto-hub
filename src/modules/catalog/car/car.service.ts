import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { CarModelService } from '../car-model/car-model.service';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,

    private readonly carModelService: CarModelService,
  ) {}

  async create(input: CreateCarInput): Promise<Car> {
    const { make, model } = await this.carModelService.resolveMakeModel(
      input.modelId,
      input.makeId,
    );

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

  async update(id: string, input: UpdateCarInput): Promise<Car> {
    const car = await this.findOneById(id);
    const preloadData = { ...car, ...input };

    if (input.makeId || input.modelId) {
      if (!input.makeId || !input.modelId) {
        throw new BadRequestException(
          'To change make/model you must provide both makeId and modelId',
        );
      }

      const { make, model } = await this.carModelService.resolveMakeModel(
        input.modelId,
        input.makeId,
      );

      preloadData.make = make;
      preloadData.model = model;
    }

    const updatedCar = await this.carRepository.preload(preloadData);

    if (!updatedCar) throw new NotFoundException('Car not found');

    return this.carRepository.save(updatedCar);
  }

  async findManyByIds(ids: readonly string[]): Promise<Car[]> {
    return this.carRepository.find({ where: { id: In(ids) } });
  }
}

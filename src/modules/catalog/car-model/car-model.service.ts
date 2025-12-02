import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModel } from './entities/car.model.entity';
import { Repository } from 'typeorm';
import { CarMake } from '../car-make/entities/car-make.entity';
import { CreateCarModelInput } from './dto/create-car-model.input';
import { UpdateCarModelInput } from './dto/update-car-model.input';

@Injectable()
export class CarModelService {
  constructor(
    @InjectRepository(CarModel)
    private readonly carModelRepository: Repository<CarModel>,
  ) {}

  async create(input: CreateCarModelInput): Promise<CarModel> {
    const carModel = this.carModelRepository.create(input);
    return this.carModelRepository.save(carModel);
  }

  async createMany(input: CreateCarModelInput[]): Promise<CarModel[]> {
    const carModels = input.map((model) =>
      this.carModelRepository.create(model),
    );
    return this.carModelRepository.save(carModels);
  }

  async findOneById(id: string): Promise<CarModel> {
    const carModel = await this.carModelRepository.findOne({ where: { id } });
    if (!carModel) throw new NotFoundException('Car model not found');
    return carModel;
  }

  async findByCarMakeId(makeId: string): Promise<CarModel[]> {
    return this.carModelRepository.find({ where: { make: { id: makeId } } });
  }

  async resolveMakeModel(
    modelId: string,
    makeId: string,
  ): Promise<{ model: CarModel; make: CarMake }> {
    const model = await this.carModelRepository.findOne({
      where: { id: modelId },
      relations: ['make'],
    });

    if (!model) {
      throw new NotFoundException('Car model not found');
    }

    if (model.make.id !== makeId) {
      throw new BadRequestException(
        'This car model does not belong to this car make',
      );
    }

    return { model, make: model.make };
  }

  async update(id: string, input: UpdateCarModelInput): Promise<CarModel> {
    await this.carModelRepository.update(id, input);
    return this.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.carModelRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Car model not found');
  }
}

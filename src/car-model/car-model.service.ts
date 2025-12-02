import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarModel } from './entities/car.model.entity';
import { Repository } from 'typeorm';
import { CarMake } from '../car-make/entities/car-make.entity';

@Injectable()
export class CarModelService {
  constructor(
    @InjectRepository(CarModel)
    private readonly carModelRepository: Repository<CarModel>,
  ) {}

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
      throw new NotFoundException('Model not found');
    }

    if (model.make.id !== makeId) {
      throw new BadRequestException('This model does not belong to this make');
    }

    return { model, make: model.make };
  }
}

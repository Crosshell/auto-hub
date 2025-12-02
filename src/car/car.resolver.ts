import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Car } from './entities/car.entity';
import { CarMake } from '../car-make/entities/car-make.entity';
import { CarModel } from '../car-model/entities/car.model.entity';
import { CarMakeService } from '../car-make/car-make.service';
import { CarModelService } from '../car-model/car-model.service';

@Resolver(() => Car)
export class CarResolver {
  constructor(
    private readonly carMakeService: CarMakeService,
    private readonly carModelService: CarModelService,
  ) {}

  @ResolveField(() => CarMake)
  async make(@Parent() car: Car) {
    return this.carMakeService.findOneById(car.makeId);
  }

  @ResolveField(() => CarModel)
  async model(@Parent() car: Car): Promise<CarModel> {
    return this.carModelService.findOneById(car.modelId);
  }
}

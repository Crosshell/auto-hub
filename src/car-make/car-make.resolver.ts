import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CarMakeService } from './car-make.service';
import { CarMake } from './entities/car-make.entity';
import { CarModel } from '../car-model/entities/car.model.entity';
import { CarModelService } from '../car-model/car-model.service';

@Resolver(() => CarMake)
export class CarMakeResolver {
  constructor(
    private readonly carMakeService: CarMakeService,
    private readonly carModelService: CarModelService,
  ) {}

  @Query(() => [CarMake])
  async carMakes(): Promise<CarMake[]> {
    return this.carMakeService.findAll();
  }

  @ResolveField(() => CarModel)
  async models(@Parent() carMake: CarMake): Promise<CarModel[]> {
    return this.carModelService.findByCarMakeId(carMake.id);
  }
}

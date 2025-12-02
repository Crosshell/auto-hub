import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CarModelService } from './car-model.service';
import { CarModel } from './entities/car.model.entity';
import { ParseUUIDPipe } from '@nestjs/common';
import { CarMake } from '../car-make/entities/car-make.entity';
import { CarMakeService } from '../car-make/car-make.service';

@Resolver(() => CarModel)
export class CarModelResolver {
  constructor(
    private readonly carModelService: CarModelService,
    private readonly carMakeService: CarMakeService,
  ) {}

  @Query(() => [CarModel])
  async carModels(
    @Args('makeId', ParseUUIDPipe) makeId: string,
  ): Promise<CarModel[]> {
    return this.carModelService.findByCarMakeId(makeId);
  }

  @ResolveField(() => CarMake)
  async make(@Parent() model: CarModel): Promise<CarMake> {
    return this.carMakeService.findByCarModelId(model.id);
  }
}

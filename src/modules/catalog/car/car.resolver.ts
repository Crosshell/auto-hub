import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Car } from './entities/car.entity';
import { CarMake } from '../car-make/entities/car-make.entity';
import { CarModel } from '../car-model/entities/car.model.entity';
import { DataLoaderService } from '../../dataloader/dataloader.service';

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly dataLoaderService: DataLoaderService) {}

  @ResolveField(() => CarMake)
  async make(@Parent() car: Car): Promise<CarMake> {
    return this.dataLoaderService.carMakesLoader.load(car.makeId);
  }

  @ResolveField(() => CarModel)
  async model(@Parent() car: Car): Promise<CarModel> {
    return this.dataLoaderService.carModelsLoader.load(car.modelId);
  }
}

import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CarModelService } from './car-model.service';
import { CarModel } from './entities/car.model.entity';
import { ParseUUIDPipe } from '@nestjs/common';
import { CarMake } from '../car-make/entities/car-make.entity';
import { UpdateCarModelInput } from './dto/update-car-model.input';
import { CreateCarModelInput } from './dto/create-car-model.input';
import { DataLoaderService } from '../../dataloader/dataloader.service';

@Resolver(() => CarModel)
export class CarModelResolver {
  constructor(
    private readonly carModelService: CarModelService,
    private readonly dataLoaderService: DataLoaderService,
  ) {}

  @Query(() => [CarModel])
  async carModels(
    @Args('makeId', ParseUUIDPipe) makeId: string,
  ): Promise<CarModel[]> {
    return this.carModelService.findByCarMakeId(makeId);
  }

  @Mutation(() => CarModel)
  async createCarModel(
    @Args('input') input: CreateCarModelInput,
  ): Promise<CarModel> {
    return this.carModelService.create(input);
  }

  @Mutation(() => CarModel)
  async updateCarModel(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') input: UpdateCarModelInput,
  ): Promise<CarModel> {
    return this.carModelService.update(id, input);
  }

  @ResolveField(() => CarMake)
  async make(@Parent() model: CarModel): Promise<CarMake> {
    return this.dataLoaderService.carMakesLoader.load(model.makeId);
  }
}

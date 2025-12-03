import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CarMakeService } from './car-make.service';
import { CarMake } from './entities/car-make.entity';
import { CarModel } from '../car-model/entities/car.model.entity';
import { CarModelService } from '../car-model/car-model.service';
import { CreateCarMakeInput } from './dto/create-car-make.input';
import { UpdateCarMakeInput } from './dto/update-car-make.input';
import { ParseUUIDPipe } from '@nestjs/common';

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

  @Mutation(() => CarMake)
  async createCarMake(
    @Args('input') input: CreateCarMakeInput,
  ): Promise<CarMake> {
    return this.carMakeService.create(input);
  }

  @Mutation(() => CarMake)
  async updateCarMake(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') input: UpdateCarMakeInput,
  ): Promise<CarMake> {
    return this.carMakeService.update(id, input);
  }

  @ResolveField(() => [CarModel])
  async models(@Parent() carMake: CarMake): Promise<CarModel[]> {
    return this.carModelService.findByCarMakeId(carMake.id);
  }
}

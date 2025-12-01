import { Query, Resolver } from '@nestjs/graphql';
import { CarMakeModel } from './models/car-make.model';
import { CarMakeService } from './car-make.service';
import { CarMakeEntity } from './entities/car-make.entity';

@Resolver()
export class CarMakeResolver {
  constructor(private readonly carMakeService: CarMakeService) {}

  @Query(() => [CarMakeModel])
  carMakes(): Promise<CarMakeEntity[]> {
    return this.carMakeService.findAll();
  }
}

import { Module } from '@nestjs/common';
import { CarGenerationResolver } from './car-generation/car-generation.resolver';
import { CarMakeResolver } from './car-make/car-make.resolver';
import { CarModelResolver } from './car-model/car-model.resolver';
import { CarModificationResolver } from './car-modification/car-modification.resolver';
import { CarMakeService } from './car-make/car-make.service';

@Module({
  providers: [
    CarGenerationResolver,
    CarMakeResolver,
    CarModelResolver,
    CarModificationResolver,
    CarMakeService,
  ],
})
export class CarCatalogModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Car } from './car/entities/car.entity';
import { CarService } from './car/car.service';
import { CarResolver } from './car/car.resolver';
import { CarModel } from './car-model/entities/car.model.entity';
import { CarMake } from './car-make/entities/car-make.entity';
import { CarMakeService } from './car-make/car-make.service';
import { CarMakeResolver } from './car-make/car-make.resolver';
import { CarModelResolver } from './car-model/car-model.resolver';
import { CarModelService } from './car-model/car-model.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car, CarModel, CarMake])],
  providers: [
    CarService,
    CarResolver,
    CarMakeService,
    CarMakeResolver,
    CarModelResolver,
    CarModelService,
  ],
  exports: [CarService],
})
export class CatalogModule {}

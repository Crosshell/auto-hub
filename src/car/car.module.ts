import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarResolver } from './car.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';
import { CarMakeEntity } from '../car-catalog/car-make/entities/car-make.entity';
import { CarModelEntity } from '../car-catalog/car-model/entities/car-model.entity';
import { CarGenerationEntity } from '../car-catalog/car-generation/entities/car-generation.entity';
import { CarModificationEntity } from '../car-catalog/car-modification/entities/car-modification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarEntity,
      CarMakeEntity,
      CarModelEntity,
      CarGenerationEntity,
      CarModificationEntity,
    ]),
  ],
  providers: [CarService, CarResolver],
  exports: [CarService],
})
export class CarModule {}

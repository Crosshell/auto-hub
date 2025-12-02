import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { CarMake } from '../car-make/entities/car-make.entity';
import { CarModel } from '../car-model/entities/car.model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, CarMake, CarModel])],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}

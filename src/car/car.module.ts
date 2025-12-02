import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { CarModelModule } from '../car-model/car-model.module';
import { CarResolver } from './car.resolver';
import { CarMakeModule } from '../car-make/car-make.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), CarModelModule, CarMakeModule],
  providers: [CarService, CarResolver],
  exports: [CarService],
})
export class CarModule {}

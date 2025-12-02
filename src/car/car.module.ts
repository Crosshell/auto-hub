import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { CarModelModule } from '../car-model/car-model.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), CarModelModule],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}

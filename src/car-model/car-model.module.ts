import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModel } from './entities/car.model.entity';
import { CarModelService } from './car-model.service';
import { CarModelResolver } from './car-model.resolver';
import { CarMakeModule } from '../car-make/car-make.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarModel]),
    forwardRef(() => CarMakeModule),
  ],
  providers: [CarModelService, CarModelResolver],
  exports: [CarModelService],
})
export class CarModelModule {}

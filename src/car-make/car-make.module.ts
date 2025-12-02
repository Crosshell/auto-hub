import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarMake } from './entities/car-make.entity';
import { CarMakeService } from './car-make.service';
import { CarMakeResolver } from './car-make.resolver';
import { CarModelModule } from '../car-model/car-model.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarMake]),
    forwardRef(() => CarModelModule),
  ],
  providers: [CarMakeService, CarMakeResolver],
  exports: [CarMakeService],
})
export class CarMakeModule {}

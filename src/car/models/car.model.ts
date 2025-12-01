import { BodyType } from '../enums/body-type.enum';
import { FuelType } from '../enums/fuel-type.enum';
import { TransmissionType } from '../enums/transmission-type.enum';
import { DriveType } from '../enums/drive-type.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CarMakeModel } from '../../car-catalog/car-make/models/car-make.model';
import { CarModelModel } from '../../car-catalog/car-model/models/car-model.model';
import { CarGenerationModel } from '../../car-catalog/car-generation/models/car-generation.model';
import { CarModificationModel } from '../../car-catalog/car-modification/models/car-modification.model';

@ObjectType()
export class CarModel {
  @Field(() => ID)
  id: string;

  @Field(() => CarMakeModel)
  make: CarMakeModel;

  @Field(() => CarModelModel)
  model: CarModelModel;

  @Field(() => CarGenerationModel)
  generation: CarGenerationModel;

  @Field(() => CarModificationModel)
  modification: CarModificationModel;

  @Field(() => BodyType)
  bodyType: BodyType;

  @Field(() => FuelType)
  fuelType: FuelType;

  @Field(() => TransmissionType)
  transmission: TransmissionType;

  @Field(() => DriveType)
  driveType: DriveType;

  @Field(() => Number)
  year: number;

  @Field(() => Number)
  mileage: number;

  @Field()
  vin: string;

  @Field({ nullable: true })
  color?: string;
}

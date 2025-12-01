import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CarModelModel } from '../../car-model/models/car-model.model';
import { CarModificationModel } from '../../car-modification/models/car-modification.model';

@ObjectType()
export class CarGenerationModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => CarModelModel)
  model: CarModelModel;

  @Field(() => [CarModificationModel])
  modifications: CarModificationModel[];
}

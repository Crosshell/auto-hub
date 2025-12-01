import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CarModelModel } from '../../car-model/models/car-model.model';

@ObjectType()
export class CarMakeModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [CarModelModel])
  models: CarModelModel[];
}

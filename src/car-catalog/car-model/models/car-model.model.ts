import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CarMakeModel } from '../../car-make/models/car-make.model';
import { CarGenerationModel } from '../../car-generation/models/car-generation.model';

@ObjectType()
export class CarModelModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => CarMakeModel)
  make: CarMakeModel;

  @Field(() => [CarGenerationModel])
  generations: CarGenerationModel[];
}

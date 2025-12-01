import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CarGenerationModel } from '../../car-generation/models/car-generation.model';

@ObjectType()
export class CarModificationModel {
  @Field(() => ID)
  id: string;

  @Field()
  engine: string;

  @Field(() => Number)
  horsepower: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => CarGenerationModel)
  generation: CarGenerationModel;
}

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RegionModel } from '../../region/models/region.model';

@ObjectType()
export class CountryModel {
  @Field(() => ID)
  id: string;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field(() => RegionModel)
  region: RegionModel;
}

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RegionModel } from '../../region/models/region.model';
import { ListingModel } from '../../../listing/models/listing.model';

@ObjectType()
export class CityModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => RegionModel)
  region: RegionModel;

  @Field(() => [ListingModel])
  listings?: ListingModel[];
}

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ListingModel } from './listing.model';

@ObjectType()
export class ListingPhotoModel {
  @Field(() => ID)
  id: string;

  @Field()
  url: string;

  @Field(() => Number)
  order: number;

  @Field(() => ListingModel)
  listing: ListingModel;
}

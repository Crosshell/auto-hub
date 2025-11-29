import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Listing')
export class ListingType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  price: number;

  @Field()
  status: 'active' | 'sold';
}

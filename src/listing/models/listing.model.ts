import { ListingStatus } from '../enums/listing-status.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../auth/user/dto/user.model';
import { CityModel } from '../../location/city/models/city.model';
import { ListingPhotoModel } from './listing-photo.model';
import { CarModel } from '../../car/models/car.model';

@ObjectType()
export class ListingModel {
  @Field(() => ID)
  id: string;

  @Field(() => UserModel)
  owner: UserModel;

  @Field(() => CarModel)
  car: CarModel;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Number)
  price: number;

  @Field(() => ListingStatus)
  status: ListingStatus;

  @Field(() => CityModel)
  city: CityModel;

  @Field(() => [ListingPhotoModel])
  photos: ListingPhotoModel[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

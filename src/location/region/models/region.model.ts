import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CountryModel } from '../../country/models/country.model';
import { CityModel } from '../../city/models/city.model';

@ObjectType()
export class RegionModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => CountryModel)
  country: CountryModel;

  @Field(() => [CityModel])
  cities: CityModel[];
}

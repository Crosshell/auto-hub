import { Module } from '@nestjs/common';
import { CityResolver } from './city/city.resolver';
import { RegionResolver } from './region/region.resolver';
import { CountryResolver } from './country/country.resolver';

@Module({
  providers: [CityResolver, RegionResolver, CountryResolver],
})
export class LocationModule {}

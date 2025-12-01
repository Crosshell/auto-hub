import { Args, Query, Resolver } from '@nestjs/graphql';
import { CityModel } from './models/city.model';
import { ParseUUIDPipe } from '@nestjs/common';
import { CityService } from './city.service';

@Resolver()
export class CityResolver {
  constructor(private cityService: CityService) {}

  @Query(() => [CityModel])
  cities(@Args('regionId', ParseUUIDPipe) regionId: string) {
    return this.cityService.findByRegion(regionId);
  }
}

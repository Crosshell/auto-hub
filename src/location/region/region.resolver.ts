import { Args, Query, Resolver } from '@nestjs/graphql';
import { RegionService } from './region.service';
import { RegionModel } from './models/region.model';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver()
export class RegionResolver {
  constructor(private regionService: RegionService) {}

  @Query(() => [RegionModel])
  regions(@Args('countryId', ParseUUIDPipe) countryId: string) {
    return this.regionService.findByCountry(countryId);
  }
}

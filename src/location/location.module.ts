import { Module } from '@nestjs/common';
import { CityResolver } from './city/city.resolver';
import { RegionResolver } from './region/region.resolver';
import { CountryResolver } from './country/country.resolver';
import { CountryService } from './country/country.service';
import { RegionService } from './region/region.service';
import { CityService } from './city/city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './city/entities/city.entity';
import { CountryEntity } from './country/entities/country.entity';
import { RegionEntity } from './region/entities/region.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity, RegionEntity, CountryEntity]),
  ],
  providers: [
    CityResolver,
    RegionResolver,
    CountryResolver,
    CountryService,
    RegionService,
    CityService,
  ],
  exports: [CountryService, RegionService, CityService],
})
export class LocationModule {}

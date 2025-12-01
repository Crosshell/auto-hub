import { CountryModel } from './models/country.model';
import { Query, Resolver } from '@nestjs/graphql';
import { CountryEntity } from './entities/country.entity';
import { CountryService } from './country.service';

@Resolver()
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => [CountryModel])
  countries(): Promise<CountryEntity[]> {
    return this.countryService.findAll();
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ListingModel } from './models/listing.model';
import { Authorization } from '../shared/decorators/auth.decorator';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { CreateListingInput } from './dto/create-listing.input';
import { ListingEntity } from './entities/listing.entity';
import { ListingService } from './listing.service';

@Resolver()
export class ListingResolver {
  constructor(private readonly listingService: ListingService) {}

  @Authorization()
  @Mutation(() => ListingModel)
  createListing(
    @Args('input') input: CreateListingInput,
    @CurrentUser('id') userId: string,
  ): Promise<ListingEntity> {
    return this.listingService.create(input, userId);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingRepository } from './listing.repository';
import { Listing } from './entities/listing.entity';
import { createListingInput } from './dto/create-listing.input';
import { ListingsArgs } from './dto/listings.args';

@Injectable()
export class ListingService {
  constructor(private repository: ListingRepository) {}

  async getListing(id: string): Promise<Listing> {
    const listing = await this.repository.getListing(id);
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return listing;
  }

  async getListings(args: ListingsArgs): Promise<Listing[]> {
    const take = args.take;
    const skip = (args.page - 1) * take;

    return this.repository.getListings({ take, skip });
  }

  async createListing(input: createListingInput): Promise<Listing> {
    return this.repository.createListing(input);
  }

  async deleteListing(id: string): Promise<void> {
    return this.repository.deleteListing(id);
  }
}

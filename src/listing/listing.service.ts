import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingRepository } from './listing.repository';
import { Listing } from './entities/listing.entity';
import { createListingInput } from './dto/create-listing.input';
import { ListingsArgs } from './dto/listings.args';

@Injectable()
export class ListingService {
  constructor(private listingRepository: ListingRepository) {}

  async getListing(id: string): Promise<Listing> {
    const listing = await this.listingRepository.getListing(id);
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return listing;
  }

  async getListings(listingsArgs: ListingsArgs): Promise<Listing[]> {
    const take = listingsArgs.take;
    const skip = (listingsArgs.page - 1) * take;

    return this.listingRepository.getListings({ take, skip });
  }

  async createListing(
    createListingInput: createListingInput,
  ): Promise<Listing> {
    return this.listingRepository.createListing(createListingInput);
  }

  async deleteListing(id: string): Promise<void> {
    return this.listingRepository.deleteListing(id);
  }
}

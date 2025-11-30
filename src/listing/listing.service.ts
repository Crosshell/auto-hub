import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingRepository } from './listing.repository';
import { Listing } from './entities/listing.entity';
import { CreateListingInput } from './inputs/create-listing.input';

@Injectable()
export class ListingService {
  constructor(private listingRepository: ListingRepository) {}

  async getListing(id: string): Promise<Listing | null> {
    const listing = await this.listingRepository.getListing(id);
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return listing;
  }

  async createListing(
    createListingInput: CreateListingInput,
  ): Promise<Listing> {
    return this.listingRepository.createListing(createListingInput);
  }
}

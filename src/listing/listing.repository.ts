import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { CreateListingInput } from './inputs/create-listing.input';

@Injectable()
export class ListingRepository {
  constructor(
    @InjectRepository(Listing) private listingRepository: Repository<Listing>,
  ) {}

  async getListing(id: string): Promise<Listing | null> {
    return this.listingRepository.findOne({ where: { id } });
  }

  async createListing(
    createListingInput: CreateListingInput,
  ): Promise<Listing> {
    const listing = this.listingRepository.create(createListingInput);
    return this.listingRepository.save(listing);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { createListingInput } from './dto/create-listing.input';

@Injectable()
export class ListingRepository {
  constructor(
    @InjectRepository(Listing) private listingRepository: Repository<Listing>,
  ) {}

  async getListing(id: string): Promise<Listing | null> {
    return this.listingRepository.findOne({ where: { id } });
  }

  async getListings(options: FindManyOptions<Listing>): Promise<Listing[]> {
    return this.listingRepository.find(options);
  }

  async createListing(input: createListingInput): Promise<Listing> {
    const listing = this.listingRepository.create(input);
    return this.listingRepository.save(listing);
  }

  async deleteListing(id: string): Promise<void> {
    await this.listingRepository.delete(id);
  }
}

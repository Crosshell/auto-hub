import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { CreateListingInput } from './dto/create-listing.input';

@Injectable()
export class ListingRepository {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
  ) {}

  async findOne(id: string): Promise<Listing | null> {
    return this.listingRepository.findOne({ where: { id } });
  }

  async findMany(options: FindManyOptions<Listing>): Promise<Listing[]> {
    return this.listingRepository.find(options);
  }

  async create(input: CreateListingInput): Promise<Listing> {
    const listing = this.listingRepository.create(input);
    return this.listingRepository.save(listing);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.listingRepository.delete(id);
  }
}

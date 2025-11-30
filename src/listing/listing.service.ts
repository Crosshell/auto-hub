import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingRepository } from './listing.repository';
import { Listing } from './entities/listing.entity';
import { CreateListingInput } from './dto/create-listing.input';
import { ListingsArgs } from './dto/listings.args';

@Injectable()
export class ListingService {
  constructor(private readonly repository: ListingRepository) {}

  async findOne(id: string): Promise<Listing> {
    const listing = await this.repository.findOne(id);
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return listing;
  }

  async findMany(args: ListingsArgs): Promise<Listing[]> {
    const take = args.take;
    const skip = (args.page - 1) * take;

    return this.repository.findMany({ take, skip });
  }

  async create(input: CreateListingInput): Promise<Listing> {
    return this.repository.create(input);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (!result.affected) throw new NotFoundException('Listing not found');
  }
}

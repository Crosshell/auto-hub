import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListingInput } from '../dto/create-listing.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from '../entities/listing.entity';
import { In, Repository } from 'typeorm';
import { CarService } from '../../catalog/car/car.service';
import { UpdateListingInput } from '../dto/update-listing.input';
import { ListingsFilterInput } from '../dto/listings-filter.input';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import { ListingSortInput } from '../dto/listings-sort.input';
import { ListingQueryBuilder } from '../builders/listing.query.builder';
import { ListingPhotoService } from './listing-photo.service';
import { PaginatedListingsResponse } from '../dto/paginated-listings.response';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly carService: CarService,
    private readonly listingPhotoService: ListingPhotoService,
  ) {}

  async create(input: CreateListingInput, userId: string): Promise<Listing> {
    const car = await this.carService.create(input.car);

    const listing = this.listingRepository.create({
      title: input.title,
      description: input.description,
      price: input.price,
      owner: { id: userId },
      location: input.location,
      car,
    });

    return this.listingRepository.save(listing);
  }

  async search(
    filter: ListingsFilterInput = {},
    pagination: PaginationInput = { skip: 0, take: 20 },
    sort?: ListingSortInput,
  ): Promise<PaginatedListingsResponse> {
    const [items, total] = await ListingQueryBuilder.base(
      this.listingRepository.createQueryBuilder('listing'),
    )
      .withFilters(filter)
      .withSorting(sort)
      .withPagination(pagination)
      .getManyAndCount();

    return { items, total };
  }

  async findOneById(id: string): Promise<Listing | null> {
    return this.listingRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, input: UpdateListingInput): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['car'],
    });

    if (!listing) throw new NotFoundException('Listing not found');

    if (input.car) {
      listing.car = await this.carService.update(listing.car.id, input.car);
    }

    Object.assign(listing, {
      ...input,
      car: undefined,
    });

    return this.listingRepository.save(listing);
  }

  async delete(id: string): Promise<void> {
    await this.listingPhotoService.deleteAllListingPhotos(id);
    const result = await this.listingRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Listing not found');
  }

  async findByUserIds(userIds: readonly string[]): Promise<Listing[]> {
    return this.listingRepository.find({
      where: { owner: { id: In(userIds) } },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListingInput } from './dto/create-listing.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { CarService } from '../car/car.service';
import { UpdateListingInput } from './dto/update-listing.input';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly carService: CarService,
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

  async findAll(): Promise<Listing[]> {
    return this.listingRepository.find();
  }

  async findOneById(id: string): Promise<Listing | null> {
    return this.listingRepository.findOne({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Listing[]> {
    return this.listingRepository.find({ where: { owner: { id: userId } } });
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
}

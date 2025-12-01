import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateListingInput } from './dto/create-listing.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingEntity } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { CarService } from '../car/car.service';
import { CityService } from '../location/city/city.service';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(ListingEntity)
    private readonly listingRepository: Repository<ListingEntity>,
    private readonly cityService: CityService,
    private readonly carService: CarService,
  ) {}

  async create(
    input: CreateListingInput,
    userId: string,
  ): Promise<ListingEntity> {
    const city = await this.cityService.findById(input.cityId);
    if (!city) throw new NotFoundException('City not found');

    const car = await this.carService.create(input.car);

    const listing = this.listingRepository.create({
      title: input.title,
      description: input.description,
      price: input.price,
      owner: { id: userId },
      city,
      car,
    });

    await this.listingRepository.save(listing);

    const returnListing = await this.listingRepository.findOne({
      where: { id: listing.id },
      relations: ['car', 'photos', 'city'],
    });

    if (!returnListing)
      throw new InternalServerErrorException('Listing not found after save');

    return listing;
  }
}

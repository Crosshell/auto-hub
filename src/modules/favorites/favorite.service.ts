import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFavorite } from './entities/user-favorite.entity';
import { Repository } from 'typeorm';
import { ListingService } from '../listing/services/listing.service';
import { Listing } from '../listing/entities/listing.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(UserFavorite)
    private userFavoriteRepository: Repository<UserFavorite>,
    private listingService: ListingService,
  ) {}

  async add(userId: string, listingId: string): Promise<boolean> {
    await this.listingService.findOneById(listingId);

    const exists = await this.userFavoriteRepository.findOne({
      where: { userId, listingId },
    });
    if (exists) return true;

    const fav = this.userFavoriteRepository.create({ userId, listingId });
    await this.userFavoriteRepository.save(fav);
    return true;
  }

  async remove(userId: string, listingId: string): Promise<boolean> {
    await this.userFavoriteRepository.delete({ userId, listingId });
    return true;
  }

  async getUserFavorites(userId: string): Promise<Listing[]> {
    const favorites = await this.userFavoriteRepository.find({
      where: { userId },
      relations: ['listing'],
    });

    return favorites.map((f) => f.listing).filter((l) => l !== null);
  }
}

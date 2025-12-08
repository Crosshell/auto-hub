import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ListingPhoto } from '../listing/entities/listing-photo.entity';
import { ListingPhotoService } from '../listing/services/listing-photo.service';
import { Car } from '../catalog/car/entities/car.entity';
import { CarService } from '../catalog/car/car.service';

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderService {
  constructor(
    private readonly userService: UserService,
    private readonly listingPhotoService: ListingPhotoService,
    private readonly carService: CarService,
  ) {}

  public readonly usersLoader = new DataLoader<string, User>(
    async (userIds: readonly string[]) => {
      const users = await this.userService.findManyByIds(userIds);

      const userMap = new Map(users.map((user) => [user.id, user]));
      return userIds.map(
        (id) => userMap.get(id) || new Error(`User not found`),
      );
    },
  );

  public readonly listingPhotosLoader = new DataLoader<string, ListingPhoto[]>(
    async (listingIds: readonly string[]) => {
      const photos =
        await this.listingPhotoService.findManyByListingIds(listingIds);

      const photosMap = new Map<string, ListingPhoto[]>();

      photos.forEach((photo) => {
        if (!photosMap.has(photo.listingId)) {
          photosMap.set(photo.listingId, []);
        }
        photosMap.get(photo.listingId)?.push(photo);
      });

      return listingIds.map((id) => photosMap.get(id) || []);
    },
  );

  public readonly carsLoader = new DataLoader<string, Car>(
    async (carIds: readonly string[]) => {
      const cars = await this.carService.findManyByIds(carIds);

      const carMap = new Map(cars.map((car) => [car.id, car]));
      return carIds.map((id) => carMap.get(id) || new Error(`Car not found`));
    },
  );
}

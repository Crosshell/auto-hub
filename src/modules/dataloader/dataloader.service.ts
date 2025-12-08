import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ListingPhoto } from '../listing/entities/listing-photo.entity';
import { ListingPhotoService } from '../listing/services/listing-photo.service';
import { Car } from '../catalog/car/entities/car.entity';
import { CarService } from '../catalog/car/car.service';
import { CarMake } from '../catalog/car-make/entities/car-make.entity';
import { CarMakeService } from '../catalog/car-make/car-make.service';
import { CarModel } from '../catalog/car-model/entities/car.model.entity';
import { CarModelService } from '../catalog/car-model/car-model.service';
import { Listing } from '../listing/entities/listing.entity';
import { ListingService } from '../listing/services/listing.service';

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderService {
  constructor(
    private readonly userService: UserService,
    private readonly listingService: ListingService,
    private readonly listingPhotoService: ListingPhotoService,
    private readonly carService: CarService,
    private readonly carMakesService: CarMakeService,
    private readonly carModelsService: CarModelService,
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

  public readonly listingPhotosByListingIdLoader = new DataLoader<
    string,
    ListingPhoto[]
  >(async (listingIds: readonly string[]) => {
    const photos =
      await this.listingPhotoService.findManyByListingIds(listingIds);

    const photosMap = new Map<string, ListingPhoto[]>();

    photos.forEach((photo) => {
      const group = photosMap.get(photo.listingId) || [];
      group.push(photo);
      photosMap.set(photo.listingId, group);
    });

    return listingIds.map((id) => photosMap.get(id) || []);
  });

  public readonly carsLoader = new DataLoader<string, Car>(
    async (carIds: readonly string[]) => {
      const cars = await this.carService.findManyByIds(carIds);

      const carMap = new Map(cars.map((car) => [car.id, car]));
      return carIds.map((id) => carMap.get(id) || new Error(`Car not found`));
    },
  );

  public readonly carMakesLoader = new DataLoader<string, CarMake>(
    async (carMakeIds: readonly string[]) => {
      const carMakes = await this.carMakesService.findManyByIds(carMakeIds);

      const carMakesMap = new Map(
        carMakes.map((carMake) => [carMake.id, carMake]),
      );
      return carMakeIds.map(
        (id) => carMakesMap.get(id) || new Error(`Car make not found`),
      );
    },
  );

  public readonly carModelsLoader = new DataLoader<string, CarModel>(
    async (carModelIds: readonly string[]) => {
      const carModels = await this.carModelsService.findManyByIds(carModelIds);

      const carModelsMap = new Map(
        carModels.map((carModel) => [carModel.id, carModel]),
      );
      return carModelIds.map(
        (id) => carModelsMap.get(id) || new Error(`Car model not found`),
      );
    },
  );

  public readonly carModelsByMakeIdLoader = new DataLoader<string, CarModel[]>(
    async (carMakeIds: readonly string[]) => {
      const carModels =
        await this.carModelsService.findManyByMakeIds(carMakeIds);

      const modelsMap = new Map<string, CarModel[]>();

      carModels.forEach((model) => {
        const group = modelsMap.get(model.makeId) || [];
        group.push(model);
        modelsMap.set(model.makeId, group);
      });

      return carMakeIds.map((id) => modelsMap.get(id) || []);
    },
  );

  public readonly listingsByUserIdLoader = new DataLoader<string, Listing[]>(
    async (userIds: readonly string[]) => {
      const listings = await this.listingService.findByUserIds(userIds);

      const listingsMap = new Map<string, Listing[]>();

      listings.forEach((listing) => {
        const group = listingsMap.get(listing.ownerId) || [];
        group.push(listing);
        listingsMap.set(listing.ownerId, group);
      });

      return userIds.map((id) => listingsMap.get(id) || []);
    },
  );
}

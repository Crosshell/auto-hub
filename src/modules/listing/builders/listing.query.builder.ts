import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { Listing } from '../entities/listing.entity';
import { ListingsFilterInput } from '../dto/listings-filter.input';
import { ListingSortInput } from '../dto/listings-sort.input';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import { ListingSortField } from '../enums/listing-sort-field.enum';

const SORT_FIELD_MAP: Record<ListingSortField, string> = {
  [ListingSortField.PRICE]: 'listing.price',
  [ListingSortField.CREATED_AT]: 'listing.createdAt',
  [ListingSortField.YEAR]: 'car.year',
};

@Injectable()
export class ListingQueryBuilder {
  private readonly qb: SelectQueryBuilder<Listing>;

  constructor(qb: SelectQueryBuilder<Listing>) {
    this.qb = qb;
  }

  static base(listingQb: SelectQueryBuilder<Listing>): ListingQueryBuilder {
    const qb = listingQb
      .leftJoinAndSelect('listing.car', 'car')
      .leftJoinAndSelect('car.make', 'make')
      .leftJoinAndSelect('car.model', 'model');

    return new ListingQueryBuilder(qb);
  }

  withFilters(filter: ListingsFilterInput = {}): this {
    this.filterByTitle(filter.title);
    this.filterByMake(filter.makeId);
    this.filterByModel(filter.modelId);
    this.filterByPrice(filter.priceFrom, filter.priceTo);
    this.filterByYear(filter.yearFrom, filter.yearTo);
    this.filterByMileage(filter.mileageTo);
    this.filterByFuelType(filter.fuelType);
    this.filterByDriveType(filter.driveType);
    this.filterByTransmission(filter.transmission);
    this.filterByBodyType(filter.bodyType);
    return this;
  }

  private filterByTitle(title?: string): this {
    if (title) {
      this.qb.andWhere('listing.title ILIKE :title', {
        title: `%${title}%`,
      });
    }

    return this;
  }

  private filterByMake(makeId?: string): this {
    if (makeId) {
      this.qb.andWhere('make.id = :makeId', { makeId });
    }

    return this;
  }

  private filterByModel(modelId?: string): this {
    if (modelId) {
      this.qb.andWhere('model.id = :modelId', { modelId });
    }

    return this;
  }

  private filterByPrice(priceFrom?: number, priceTo?: number): this {
    if (priceFrom) {
      this.qb.andWhere('listing.price >= :priceFrom', { priceFrom });
    }

    if (priceTo) {
      this.qb.andWhere('listing.price <= :priceTo', { priceTo });
    }

    return this;
  }

  private filterByYear(yearFrom?: number, yearTo?: number): this {
    if (yearFrom) {
      this.qb.andWhere('car.year >= :yearFrom', { yearFrom });
    }

    if (yearTo) {
      this.qb.andWhere('car.year <= :yearTo', { yearTo });
    }

    return this;
  }

  private filterByMileage(mileageTo?: number): this {
    if (mileageTo) {
      this.qb.andWhere('car.mileage <= :mileageTo', { mileageTo });
    }

    return this;
  }

  private filterByFuelType(fuelType?: string): this {
    if (fuelType) {
      this.qb.andWhere('car.fuelType = :fuelType', { fuelType });
    }

    return this;
  }

  private filterByDriveType(driveType?: string): this {
    if (driveType) {
      this.qb.andWhere('car.driveType = :driveType', { driveType });
    }

    return this;
  }

  private filterByTransmission(transmission?: string): this {
    if (transmission) {
      this.qb.andWhere('car.transmission = :transmission', { transmission });
    }

    return this;
  }

  private filterByBodyType(bodyType?: string): this {
    if (bodyType) {
      this.qb.andWhere('car.bodyType = :bodyType', { bodyType: bodyType });
    }

    return this;
  }

  withSorting(sort?: ListingSortInput): this {
    if (sort?.field) {
      const column = SORT_FIELD_MAP[sort.field] ?? 'listing.createdAt';
      this.qb.orderBy(column, sort.order ?? 'DESC');
    } else {
      this.qb.orderBy('listing.createdAt', 'DESC');
    }
    return this;
  }

  withPagination(pagination: PaginationInput = { skip: 0, take: 20 }): this {
    this.qb.skip(pagination.skip ?? 0).take(pagination.take ?? 20);
    return this;
  }

  async getManyAndCount(): Promise<[Listing[], number]> {
    return this.qb.getManyAndCount();
  }
}

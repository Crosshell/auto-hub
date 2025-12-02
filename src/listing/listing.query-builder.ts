import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { ListingsFilterInput } from './dto/listings-filter.input';
import { ListingSortInput } from './dto/listings-sort.input';
import { PaginationInput } from '../shared/dto/pagination.input';
import { ListingSortField } from './enums/listing-sort-field.enum';

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
    if (filter.title) {
      this.qb.andWhere('listing.title ILIKE :title', {
        title: `%${filter.title}%`,
      });
    }

    if (filter.makeId) {
      this.qb.andWhere('make.id = :makeId', { makeId: filter.makeId });
    }

    if (filter.modelId) {
      this.qb.andWhere('model.id = :modelId', { modelId: filter.modelId });
    }

    if (filter.priceFrom) {
      this.qb.andWhere('listing.price >= :priceFrom', {
        priceFrom: filter.priceFrom,
      });
    }

    if (filter.priceTo) {
      this.qb.andWhere('listing.price <= :priceTo', {
        priceTo: filter.priceTo,
      });
    }

    if (filter.yearFrom) {
      this.qb.andWhere('car.year >= :yearFrom', { yearFrom: filter.yearFrom });
    }

    if (filter.yearTo) {
      this.qb.andWhere('car.year <= :yearTo', { yearTo: filter.yearTo });
    }

    if (filter.mileageTo) {
      this.qb.andWhere('car.mileage <= :mileageTo', {
        mileageTo: filter.mileageTo,
      });
    }

    if (filter.fuelType) {
      this.qb.andWhere('car.fuelType = :fuelType', {
        fuelType: filter.fuelType,
      });
    }

    if (filter.driveType) {
      this.qb.andWhere('car.driveType = :driveType', {
        driveType: filter.driveType,
      });
    }

    if (filter.transmission) {
      this.qb.andWhere('car.transmission = :transmission', {
        transmission: filter.transmission,
      });
    }

    if (filter.bodyType) {
      this.qb.andWhere('car.bodyType = :bodyType', {
        bodyType: filter.bodyType,
      });
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

  async getMany(): Promise<Listing[]> {
    return this.qb.getMany();
  }

  async getCount(): Promise<number> {
    return this.qb.getCount();
  }

  getQueryBuilder(): SelectQueryBuilder<Listing> {
    return this.qb;
  }
}

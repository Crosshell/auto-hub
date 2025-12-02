import { registerEnumType } from '@nestjs/graphql';

export enum ListingSortField {
  PRICE = 'price',
  YEAR = 'car.year',
  CREATED_AT = 'createdAt',
}

registerEnumType(ListingSortField, { name: 'ListingSortField' });

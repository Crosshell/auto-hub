import { registerEnumType } from '@nestjs/graphql';

export enum ListingStatus {
  ACTIVE = 'active',
  SOLD = 'sold',
}

registerEnumType(ListingStatus, {
  name: 'ListingStatus',
});

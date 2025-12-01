import { registerEnumType } from '@nestjs/graphql';

export enum ListingStatus {
  ACTIVE,
  SOLD,
  ARCHIVED,
}

registerEnumType(ListingStatus, {
  name: 'ListingStatus',
});

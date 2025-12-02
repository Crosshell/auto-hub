import { registerEnumType } from '@nestjs/graphql';

export enum ListingStatus {
  ACTIVE = 'ACTIVE',
  SOLD = 'SOLD',
  ARCHIVED = 'ARCHIVED',
}

registerEnumType(ListingStatus, {
  name: 'ListingStatus',
});

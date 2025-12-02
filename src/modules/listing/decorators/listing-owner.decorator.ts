import { applyDecorators, UseGuards } from '@nestjs/common';
import { ListingOwnerGuard } from '../guards/listing-owner.guard';

export function ListingOwner() {
  return applyDecorators(UseGuards(ListingOwnerGuard));
}

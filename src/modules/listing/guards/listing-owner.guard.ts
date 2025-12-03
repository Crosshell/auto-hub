import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ListingService } from '../listing.service';
import type { Request } from 'express';

@Injectable()
export class ListingOwnerGuard implements CanActivate {
  constructor(private readonly listingService: ListingService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext<{ req: Request }>();

    const args = ctx.getArgs<{ id?: string; listingId?: string }>();
    const id = args.id || args.listingId;

    if (!id) {
      throw new ForbiddenException('Listing id was not provided');
    }

    const listing = await this.listingService.findOneById(id);
    if (!listing) throw new NotFoundException('Listing not found');

    if (listing.ownerId !== req.session.userId) {
      throw new ForbiddenException('You are not the owner of this listing');
    }

    return true;
  }
}

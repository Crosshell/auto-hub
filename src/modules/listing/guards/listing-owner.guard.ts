import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ListingService } from '../listing.service';
import { RequestWithUser } from '../../../shared/types/request-with-user.type';

@Injectable()
export class ListingOwnerGuard implements CanActivate {
  constructor(private readonly listingService: ListingService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext<RequestWithUser>();

    const user = request.user;
    if (!user) throw new ForbiddenException('Not authenticated');

    const args = ctx.getArgs<{ id: string }>();
    const id = args.id;

    if (!id) {
      throw new ForbiddenException('Listing id was not provided');
    }

    const listing = await this.listingService.findOneById(id);
    if (!listing) throw new NotFoundException('Listing not found');

    if (listing.ownerId !== user.id) {
      throw new ForbiddenException('You are not the owner of this listing');
    }

    return true;
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Authorization } from '../auth/decorators/auth.decorator';
import { FavoriteService } from './favorite.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver()
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Authorization()
  @Mutation(() => Boolean)
  async addFavorite(
    @CurrentUser('id') userId: string,
    @Args('listingId') listingId: string,
  ): Promise<boolean> {
    return this.favoriteService.add(userId, listingId);
  }

  @Authorization()
  @Mutation(() => Boolean)
  async removeFavorite(
    @CurrentUser('id') userId: string,
    @Args('listingId') listingId: string,
  ): Promise<boolean> {
    return this.favoriteService.remove(userId, listingId);
  }
}

import { ListingPhoto } from '../entities/listing-photo.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Authorization } from '../../auth/decorators/auth.decorator';
import { ListingOwner } from '../decorators/listing-owner.decorator';
import { ParseUUIDPipe } from '@nestjs/common';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { ListingPhotoService } from '../services/listing-photo.service';

@Resolver(() => ListingPhoto)
export class ListingPhotoResolver {
  constructor(private readonly listingPhotoService: ListingPhotoService) {}

  @Authorization()
  @ListingOwner()
  @Mutation(() => [ListingPhoto])
  async uploadListingPhotos(
    @Args('listingId', ParseUUIDPipe) listingId: string,
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files: Promise<FileUpload>[],
  ): Promise<ListingPhoto[]> {
    return this.listingPhotoService.uploadListingPhotos(listingId, files);
  }

  @Authorization()
  @ListingOwner()
  @Mutation(() => Boolean)
  async deleteListingPhoto(
    @Args('listingId', ParseUUIDPipe) listingId: string,
    @Args('photoId', ParseUUIDPipe) photoId: string,
  ): Promise<boolean> {
    return this.listingPhotoService.deleteListingPhoto(listingId, photoId);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingPhoto } from './entities/listing-photo.entity';
import { Repository } from 'typeorm';
import { FileUpload } from 'graphql-upload-ts';
import { Readable } from 'stream';
import { UploadService } from '../upload/upload.service';
import { streamToBuffer } from '../../shared/utils/stream-to-buffer.util';

@Injectable()
export class ListingPhotoService {
  constructor(
    @InjectRepository(ListingPhoto)
    private readonly listingPhotoRepository: Repository<ListingPhoto>,
    private readonly uploadService: UploadService,
  ) {}

  async uploadListingPhotos(listingId: string, files: Promise<FileUpload>[]) {
    const uploads = await Promise.all(files);

    const result: ListingPhoto[] = [];

    for (const file of uploads) {
      const photo = await this.uploadListingPhoto(listingId, file);
      result.push(photo);
    }

    return result;
  }

  async uploadListingPhoto(listingId: string, file: FileUpload) {
    const stream: Readable = file.createReadStream();
    const buffer = await streamToBuffer(stream);

    const url = await this.uploadService.uploadFile(
      buffer,
      file.filename,
      file.mimetype,
      `listing/${listingId}`,
    );

    const photo = this.listingPhotoRepository.create({
      listingId,
      url,
    });

    return this.listingPhotoRepository.save(photo);
  }

  async deleteListingPhoto(
    listingId: string,
    photoId: string,
  ): Promise<boolean> {
    const photo = await this.listingPhotoRepository.findOne({
      where: { id: photoId, listingId },
    });

    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    await this.uploadService.deleteFile(photo.url);

    await this.listingPhotoRepository.delete(photoId);

    return true;
  }

  async findPhotosByListingId(listingId: string): Promise<ListingPhoto[]> {
    return await this.listingPhotoRepository.find({ where: { listingId } });
  }

  async deleteAllListingPhotos(listingId: string): Promise<void> {
    const photos = await this.listingPhotoRepository.find({
      where: { listingId },
    });

    for (const photo of photos) {
      await this.uploadService.deleteFile(photo.url);
    }

    await this.listingPhotoRepository.delete({ listingId });
  }
}

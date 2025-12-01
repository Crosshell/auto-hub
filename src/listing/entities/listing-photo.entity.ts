import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ListingEntity } from './listing.entity';

@Entity({ name: 'listing_photos' })
export class ListingPhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => ListingEntity, (listing) => listing.photos, {
    onDelete: 'CASCADE',
  })
  listing: ListingEntity;
}

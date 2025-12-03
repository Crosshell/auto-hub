import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Listing } from './listing.entity';

@Entity('listing_photos')
@ObjectType()
export class ListingPhoto {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  url: string;

  @Column()
  listingId: string;

  @ManyToOne(() => Listing, (listing) => listing.photos, {
    onDelete: 'CASCADE',
  })
  listing: Listing;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}

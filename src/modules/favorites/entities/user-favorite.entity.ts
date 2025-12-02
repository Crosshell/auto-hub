import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Listing } from '../../listing/entities/listing.entity';

@Entity('user_favorites')
@ObjectType()
export class UserFavorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  listingId: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Listing, { onDelete: 'CASCADE' })
  listing: Listing;

  @CreateDateColumn()
  createdAt: Date;
}

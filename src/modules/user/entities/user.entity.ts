import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Listing } from '../../listing/entities/listing.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserFavorite } from '../../favorites/entities/user-favorite.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String, { nullable: true })
  email: string;

  @Column({ unique: true })
  @Field(() => String)
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  phone?: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isEmailVerified: boolean;

  @OneToMany(() => Listing, (listing) => listing.owner)
  @Field(() => [Listing])
  listings?: Listing[];

  @OneToMany(() => UserFavorite, (fav) => fav.user)
  @Field(() => [Listing], { nullable: true })
  favoriteListings?: Listing[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

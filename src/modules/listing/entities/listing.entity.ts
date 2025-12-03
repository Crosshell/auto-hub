import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Car } from '../../catalog/car/entities/car.entity';
import { ListingStatus } from '../enums/listing-status.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ListingPhoto } from './listing-photo.entity';

@Entity({ name: 'listings' })
@ObjectType()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => User)
  @Field(() => User)
  owner: User;

  @Column()
  carId: string;

  @OneToOne(() => Car, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  @Field(() => Car)
  car: Car;

  @Column()
  @Field()
  title: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field(() => Number)
  price: number;

  @Column({ default: ListingStatus.ACTIVE })
  @Field(() => ListingStatus)
  status: ListingStatus;

  @Column()
  @Field()
  location: string;

  @OneToMany(() => ListingPhoto, (photo) => photo.listing, { cascade: true })
  @Field(() => [ListingPhoto])
  photos: ListingPhoto[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

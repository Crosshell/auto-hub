import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/user/entities/user.entity';
import { Car } from '../../car/entities/car.entity';
import { ListingStatus } from '../enums/listing-status.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';

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

  @ManyToOne(() => Car, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
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

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

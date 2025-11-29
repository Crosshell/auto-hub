import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ListingStatus } from '../enums/listing-status.enum';

@Entity()
@ObjectType()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field(() => Float)
  price: number;

  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.ACTIVE,
  })
  @Field(() => ListingStatus)
  status: ListingStatus;
}

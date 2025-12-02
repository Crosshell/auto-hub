import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { CarMake } from '../../car-make/entities/car-make.entity';
import { CarModel } from '../../car-model/entities/car.model.entity';
import { BodyType } from '../enums/body-type.enum';
import { DriveType } from '../enums/drive-type.enum';
import { TransmissionType } from '../enums/transmission-type.enum';
import { FuelType } from '../enums/fuel-type.enum';
import { Listing } from '../../../listing/entities/listing.entity';

@Entity({ name: 'cars' })
@ObjectType()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  makeId: string;

  @Column()
  modelId: string;

  @OneToOne(() => Listing, (listing) => listing.car)
  listing: Listing;

  @ManyToOne(() => CarMake, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field(() => CarMake)
  make: CarMake;

  @ManyToOne(() => CarModel, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Field(() => CarModel)
  model: CarModel;

  @Column()
  @Field(() => Number)
  mileage: number;

  @Column()
  @Field()
  vin: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  @Field(() => Number, { nullable: true })
  engineVolume?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  modification?: string;

  @Column()
  @Field(() => Int)
  year: number;

  @Column({ type: 'enum', enum: BodyType })
  @Field(() => BodyType)
  bodyType: BodyType;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  seats?: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  doors?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  color?: string;

  @Column({ type: 'enum', enum: DriveType })
  @Field(() => DriveType)
  driveType: DriveType;

  @Column({ type: 'enum', enum: TransmissionType })
  @Field(() => TransmissionType)
  transmission: TransmissionType;

  @Column({ type: 'enum', enum: FuelType })
  @Field(() => FuelType)
  fuelType: FuelType;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  horsePower?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  fuelConsumption?: number;
}

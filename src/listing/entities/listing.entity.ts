import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../auth/user/entities/user.entity';
import { CarEntity } from '../../car/entities/car.entity';
import { ListingStatus } from '../enums/listing-status.enum';
import { ListingPhotoEntity } from './listing-photo.entity';
import { CityEntity } from '../../location/city/entities/city.entity';

@Entity({ name: 'listings' })
export class ListingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @ManyToOne(() => CarEntity, { cascade: true })
  car: CarEntity;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  price: number;

  @Column({ default: ListingStatus.ACTIVE })
  status: ListingStatus;

  @ManyToOne(() => CityEntity)
  city: CityEntity;

  @OneToMany(() => ListingPhotoEntity, (p) => p.listing, { cascade: true })
  photos: ListingPhotoEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

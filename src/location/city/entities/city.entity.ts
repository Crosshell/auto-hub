import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegionEntity } from '../../region/entities/region.entity';
import { ListingEntity } from '../../../listing/entities/listing.entity';

@Entity({ name: 'cities' })
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => RegionEntity, (region) => region.cities)
  region: RegionEntity;

  @OneToMany(() => ListingEntity, (listing) => listing.city)
  listings: ListingEntity[];
}

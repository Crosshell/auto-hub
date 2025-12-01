import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity } from '../../country/entities/country.entity';
import { CityEntity } from '../../city/entities/city.entity';

@Entity({ name: 'regions' })
export class RegionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CountryEntity, (country) => country.regions)
  country: CountryEntity;

  @OneToMany(() => CityEntity, (city) => city.region)
  cities: CityEntity[];
}

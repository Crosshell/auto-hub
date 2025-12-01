import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RegionEntity } from '../../region/entities/region.entity';

@Entity({ name: 'countries' })
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(() => RegionEntity, (region) => region.country)
  regions: RegionEntity[];
}

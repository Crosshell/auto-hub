import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarMakeEntity } from '../../car-make/entities/car-make.entity';
import { CarGenerationEntity } from '../../car-generation/entities/car-generation.entity';

@Entity({ name: 'car_models' })
export class CarModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CarMakeEntity, (make) => make.models)
  make: CarMakeEntity;

  @OneToMany(() => CarGenerationEntity, (gen) => gen.model)
  generations: CarGenerationEntity[];
}

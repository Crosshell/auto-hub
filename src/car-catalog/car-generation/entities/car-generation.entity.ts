import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarModificationEntity } from '../../car-modification/entities/car-modification.entity';
import { CarModelEntity } from '../../car-model/entities/car-model.entity';

@Entity({ name: 'car_generations' })
export class CarGenerationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CarModelEntity, (model) => model.generations)
  model: CarModelEntity;

  @OneToMany(() => CarModificationEntity, (mod) => mod.generation)
  modifications: CarModificationEntity[];
}

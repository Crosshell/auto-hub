import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarGenerationEntity } from './car-generation.entity';

@Entity({ name: 'car_modifications' })
export class CarModificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  engine: string;

  @Column()
  horsepower: number;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => CarGenerationEntity, (gen) => gen.modifications)
  generation: CarGenerationEntity;
}

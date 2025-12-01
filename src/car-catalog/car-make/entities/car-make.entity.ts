import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CarModelEntity } from '../../car-model/entities/car-model.entity';

@Entity({ name: 'car_makes' })
export class CarMakeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => CarModelEntity, (model) => model.make)
  models: CarModelEntity[];
}

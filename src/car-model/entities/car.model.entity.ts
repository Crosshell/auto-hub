import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CarMake } from '../../car-make/entities/car-make.entity';

@Entity({ name: 'car_models' })
@ObjectType()
export class CarModel {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  makeId: string;

  @ManyToOne(() => CarMake, (make) => make.models, { cascade: true })
  @JoinColumn({ name: 'makeId' })
  @Field(() => CarMake)
  make: CarMake;
}

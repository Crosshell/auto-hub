import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CarModel } from '../../car-model/entities/car.model.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'car_makes' })
@ObjectType()
export class CarMake {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @OneToMany(() => CarModel, (model) => model.make)
  @Field(() => [CarModel])
  models: CarModel[];
}

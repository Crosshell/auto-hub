import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @Field()
  makeId: string;

  @ManyToOne(() => CarMake, (make) => make.models, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => CarMake)
  make: CarMake;
}

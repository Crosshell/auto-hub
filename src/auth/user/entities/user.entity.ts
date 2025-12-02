import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Listing } from '../../../listing/entities/listing.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column({ unique: true })
  @Field(() => String)
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  phone?: string;

  @Column({ default: false, name: 'is_email_verified' })
  @Field(() => Boolean)
  isEmailVerified: boolean;

  @OneToMany(() => Listing, (listing) => listing.owner)
  @Field(() => [Listing])
  listings?: Listing[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}

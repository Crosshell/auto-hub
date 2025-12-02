import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateCarInput } from './create-car.input';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  makeId?: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  modelId?: string;
}

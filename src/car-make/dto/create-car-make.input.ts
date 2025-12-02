import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateNestedCarModelInput } from './create-nested-car-model.input';

@InputType()
export class CreateCarMakeInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => [CreateNestedCarModelInput])
  @ValidateNested()
  models: CreateNestedCarModelInput[];
}

import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateNestedCarModelInput } from './create-nested-car-model.input';
import { Type } from 'class-transformer';

@InputType()
export class CreateCarMakeInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => [CreateNestedCarModelInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNestedCarModelInput)
  models: CreateNestedCarModelInput[];
}

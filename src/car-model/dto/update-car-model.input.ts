import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateCarModelInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}

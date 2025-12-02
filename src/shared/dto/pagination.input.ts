import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  skip = 0;

  @Field(() => Int, { defaultValue: 20 })
  @IsInt()
  take = 20;
}

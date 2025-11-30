import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@ArgsType()
export class ListingsArgs {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  page: number = 0;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(50)
  take: number = 25;
}

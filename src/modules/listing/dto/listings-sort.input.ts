import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../../../shared/enums/sort-order.enum';
import { ListingSortField } from '../enums/listing-sort-field.enum';
import { IsEnum, IsOptional } from 'class-validator';

@InputType()
export class ListingSortInput {
  @Field(() => ListingSortField)
  @IsOptional()
  @IsEnum(ListingSortField)
  field?: ListingSortField;

  @Field(() => SortOrder)
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;
}

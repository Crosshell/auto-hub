import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../../shared/enums/sort-order.enum';
import { ListingSortField } from '../enums/listing-sort-field.enum';

@InputType()
export class ListingSortInput {
  @Field(() => ListingSortField)
  field: ListingSortField;

  @Field(() => SortOrder)
  order: SortOrder;
}

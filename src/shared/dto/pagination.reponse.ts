import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  items: T[];
  total: number;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef])
    items: T[];

    @Field(() => Int)
    total: number;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}

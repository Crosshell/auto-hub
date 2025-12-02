import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ListingsArgs {
  page?: number;
  limit?: number;
}

import { Field, Float, InputType } from '@nestjs/graphql';
import { ListingStatus } from '../enums/listing-status.enum';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateListingInput {
  @MinLength(4)
  @MaxLength(50)
  @Field()
  title: string;

  @IsOptional()
  @MinLength(10)
  @MaxLength(2048)
  @Field({ nullable: true })
  description?: string;

  @IsNumber()
  @Min(100)
  @Field(() => Float)
  price: number;

  @IsEnum(ListingStatus)
  @IsOptional()
  @Field(() => ListingStatus)
  status?: ListingStatus;
}

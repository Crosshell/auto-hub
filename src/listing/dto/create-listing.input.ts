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
export class createListingInput {
  @Field()
  @MinLength(4)
  @MaxLength(50)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(10)
  @MaxLength(2048)
  description?: string;

  @Field(() => Float)
  @IsNumber()
  @Min(100)
  price: number;

  @Field(() => ListingStatus, { nullable: true })
  @IsOptional()
  @IsEnum(ListingStatus)
  status?: ListingStatus;
}

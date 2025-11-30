import { Field, Float, InputType } from '@nestjs/graphql';
import { ListingStatus } from '../enums/listing-status.enum';
import { IsEnum, IsNumber, IsOptional, Length, Min } from 'class-validator';

@InputType()
export class createListingInput {
  @Field()
  @Length(4, 50)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(10, 2048)
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

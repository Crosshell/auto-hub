import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ListingStatus } from '../enums/listing-status.enum';
import { Type } from 'class-transformer';
import { CreateCarInput } from '../../car/dto/create-car.input';

@InputType()
export class CreateListingInput {
  @Field(() => CreateCarInput)
  @ValidateNested()
  @Type(() => CreateCarInput)
  car: CreateCarInput;

  @Field()
  @Length(3, 100)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 1024)
  description?: string;

  @Field(() => Number)
  @Min(100)
  @Max(100_000_000)
  price: number;

  @Field(() => ListingStatus, { defaultValue: ListingStatus.ACTIVE })
  @IsOptional()
  @IsEnum(ListingStatus)
  status: ListingStatus;

  @Field()
  @IsString()
  @IsNotEmpty()
  location: string;
}

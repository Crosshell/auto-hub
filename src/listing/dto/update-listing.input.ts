import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateListingInput } from './create-listing.input';
import { UpdateCarInput } from '../../car/dto/update-car.input';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class UpdateListingInput extends PartialType(
  OmitType(CreateListingInput, ['car']),
) {
  @Field(() => UpdateCarInput, { nullable: true })
  @ValidateNested()
  @Type(() => UpdateCarInput)
  @IsOptional()
  car?: UpdateCarInput;
}

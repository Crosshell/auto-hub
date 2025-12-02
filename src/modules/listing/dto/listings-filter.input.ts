import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { FuelType } from '../../catalog/car/enums/fuel-type.enum';
import { DriveType } from '../../catalog/car/enums/drive-type.enum';
import { TransmissionType } from '../../catalog/car/enums/transmission-type.enum';
import { BodyType } from '../../catalog/car/enums/body-type.enum';

@InputType()
export class ListingsFilterInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  makeId?: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  modelId?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  priceFrom?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  priceTo?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  yearFrom?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  yearTo?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  mileageTo?: number;

  @Field(() => FuelType, { nullable: true })
  @IsEnum(FuelType)
  @IsOptional()
  fuelType?: FuelType;

  @Field(() => TransmissionType, { nullable: true })
  @IsEnum(TransmissionType)
  @IsOptional()
  transmission?: TransmissionType;

  @Field(() => DriveType, { nullable: true })
  @IsEnum(DriveType)
  @IsOptional()
  driveType?: DriveType;

  @Field(() => BodyType, { nullable: true })
  @IsEnum(BodyType)
  @IsOptional()
  bodyType?: BodyType;
}

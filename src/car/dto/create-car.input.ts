import { Field, InputType, ID, Float, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { BodyType } from '../enums/body-type.enum';
import { FuelType } from '../enums/fuel-type.enum';
import { TransmissionType } from '../enums/transmission-type.enum';
import { DriveType } from '../enums/drive-type.enum';

@InputType()
export class CreateCarInput {
  @Field(() => ID)
  @IsUUID()
  makeId: string;

  @Field(() => ID)
  @IsUUID()
  modelId: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(100_000_000)
  mileage: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  vin: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  engineVolume?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  modification?: string;

  @Field(() => Int)
  @IsInt()
  @Min(1800)
  @Max(2030)
  year: number;

  @Field(() => BodyType)
  @IsEnum(BodyType)
  bodyType: BodyType;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  seats?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  doors?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  color?: string;

  @Field(() => DriveType)
  @IsEnum(DriveType)
  driveType: DriveType;

  @Field(() => TransmissionType)
  @IsEnum(TransmissionType)
  transmission: TransmissionType;

  @Field(() => FuelType)
  @IsEnum(FuelType)
  fuelType: FuelType;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10000)
  horsePower?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  fuelConsumption?: number;
}

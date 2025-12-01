import { Field, InputType, ID } from '@nestjs/graphql';
import { IsEnum, IsUUID, Max, Min } from 'class-validator';
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

  @Field(() => ID)
  @IsUUID()
  generationId: string;

  @Field(() => ID)
  @IsUUID()
  modificationId: string;

  @Field(() => BodyType)
  @IsEnum(BodyType)
  bodyType: BodyType;

  @Field(() => FuelType)
  @IsEnum(FuelType)
  fuelType: FuelType;

  @Field(() => TransmissionType)
  @IsEnum(TransmissionType)
  transmission: TransmissionType;

  @Field(() => DriveType)
  @IsEnum(DriveType)
  driveType: DriveType;

  @Field()
  @Min(1800)
  @Max(2030)
  year: number;

  @Field()
  @Min(0)
  @Max(100_000_000)
  mileage: number;

  @Field()
  vin: string;

  @Field({ nullable: true })
  color?: string;
}

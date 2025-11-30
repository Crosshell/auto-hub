import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, Matches } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @Matches(/^\+[1-9]\d{7,14}$/, {
    message:
      'Invalid phone number. Must match E.164 format, e.g. +380931234567',
  })
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 50)
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 50)
  lastName?: string;
}

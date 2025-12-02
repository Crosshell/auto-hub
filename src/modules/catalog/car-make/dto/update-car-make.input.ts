import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateCarMakeInput } from './create-car-make.input';

@InputType()
export class UpdateCarMakeInput extends PartialType(
  OmitType(CreateCarMakeInput, ['models']),
) {}

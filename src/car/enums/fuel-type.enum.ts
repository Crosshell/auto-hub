import { registerEnumType } from '@nestjs/graphql';

export enum FuelType {
  PETROL,
  DIESEL,
  HYBRID,
  ELECTRIC,
  GASOLINE,
}

registerEnumType(FuelType, {
  name: 'FuelType',
});

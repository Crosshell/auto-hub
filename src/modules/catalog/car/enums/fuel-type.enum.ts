import { registerEnumType } from '@nestjs/graphql';

export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  HYBRID = 'HYBRID',
  ELECTRIC = 'ELECTRIC',
  GASOLINE = 'GASOLINE',
}

registerEnumType(FuelType, {
  name: 'FuelType',
});

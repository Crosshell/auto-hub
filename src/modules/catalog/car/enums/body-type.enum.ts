import { registerEnumType } from '@nestjs/graphql';

export enum BodyType {
  BUGGY = 'BUGGY',
  CABRIOLET = 'CABRIOLET',
  COUPE = 'COUPE',
  FASTBACK = 'FASTBACK',
  HATCHBACK = 'HATCHBACK',
  SEDAN = 'SEDAN',
  LIMOUSINE = 'LIMOUSINE',
  VAN = 'VAN',
  SUV = 'SUV',
  PICKUP = 'PICKUP',
}

registerEnumType(BodyType, {
  name: 'BodyType',
});

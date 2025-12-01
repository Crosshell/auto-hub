import { registerEnumType } from '@nestjs/graphql';

export enum BodyType {
  BUGGY,
  CABRIOLET,
  COUPE,
  FASTBACK,
  HATCHBACK,
  SEDAN,
  LIMOUSINE,
  VAN,
  SUV,
  PICKUP,
}

registerEnumType(BodyType, {
  name: 'BodyType',
});

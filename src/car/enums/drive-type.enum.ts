import { registerEnumType } from '@nestjs/graphql';

export enum DriveType {
  FWD,
  RWD,
  AWD,
  '4WD',
}

registerEnumType(DriveType, {
  name: 'DriveType',
});

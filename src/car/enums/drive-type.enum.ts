import { registerEnumType } from '@nestjs/graphql';

export enum DriveType {
  FWD = 'FWD',
  RWD = 'RWD',
  AWD = 'AWD',
  '4WD' = '4WD',
}

registerEnumType(DriveType, {
  name: 'DriveType',
});

import { registerEnumType } from '@nestjs/graphql';

export enum TransmissionType {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
  CVT = 'CVT',
  DSG = 'DSG',
}

registerEnumType(TransmissionType, {
  name: 'TransmissionType',
});

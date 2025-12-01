import { registerEnumType } from '@nestjs/graphql';

export enum TransmissionType {
  MANUAL,
  AUTOMATIC,
  CVT,
  DSG,
}

registerEnumType(TransmissionType, {
  name: 'TransmissionType',
});

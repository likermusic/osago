import type { CarInfoCommonFields } from 'entities/carInfo';

type TGetCarIdentifierByPriorityParam = Pick<CarInfoCommonFields, 'carVinNumber' | 'bodyNumber' | 'chassisNumber'>;

export const getCarIdentifierByPriority = (carIdentifiers: TGetCarIdentifierByPriorityParam) => {
  if (!carIdentifiers) {
    return {};
  }

  if (carIdentifiers.carVinNumber) {
    return { vin: carIdentifiers.carVinNumber };
  }

  if (carIdentifiers.bodyNumber) {
    return { bodyNumber: carIdentifiers.bodyNumber };
  }
  if (carIdentifiers.chassisNumber) {
    return { chassisNumber: carIdentifiers.chassisNumber };
  }

  return {};
};

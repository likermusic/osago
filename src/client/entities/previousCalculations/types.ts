import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

export interface previousCalculationsState {
  result: IPreviousCalculations[];
}

export interface IPreviousCalculations {
  auto: Nullable<string>;
  regNumber: Nullable<string>;
  minPrice: Nullable<number>;
  calculationHash: string;
  vehicleType: VehicleType;
}

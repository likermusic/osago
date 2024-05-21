import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

import type { CarNumberLandingFormFields } from './types';

export const landingFormDefaultValue = (initialVehicleType: VehicleType): CarNumberLandingFormFields =>
  ({ carNumber: '', vehicleType: initialVehicleType } as const);

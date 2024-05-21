import type React from 'react';

import type { CarNumberLandingFormFields } from 'entities/carInfo';

import { CarNumberInput, VehicleTypeField } from '../Fields';

export const FormFieldsControls: Record<keyof CarNumberLandingFormFields, React.ReactNode> = {
  carNumber: CarNumberInput,
  vehicleType: VehicleTypeField,
};

import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

export const VEHICLE_TEXT_MAP_GENITIVE_CASE_SHORT: Record<VehicleType, string> = {
  car: 'авто',
  motorcycle: 'мотоцикла',
};

export const VEHICLE_TEXT_MAP_GENITIVE_CASE: Record<VehicleType, string> = {
  car: 'автомобиля',
  motorcycle: 'мотоцикла',
};

export const VEHICLE_TEXT_MAP_CREATIVE_CASE: Record<VehicleType, string> = {
  car: 'автомобилем',
  motorcycle: 'мотоциклом',
};

export const VEHICLE_TEXT_MAP_NOMINATIVE_CASE: Record<VehicleType, string> = {
  car: 'автомобиль',
  motorcycle: 'мотоцикл',
};

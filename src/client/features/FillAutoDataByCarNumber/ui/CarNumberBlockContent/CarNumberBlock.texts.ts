import type { CarNumberLandingFormFields } from 'entities/carInfo';

export const CarNumberBlockTexts = {
  captionTitleMotorcyclePage: 'Введите госномер мотоцикла',
  btnCalculateTitle: 'Рассчитать',
  btnSkipNumberTitle: 'Нет номера',
};
export const FormFields: Record<keyof CarNumberLandingFormFields, string> = {
  carNumber: '',
  vehicleType: '',
};

import { AGE_OF_PASSPORT_ISSUE } from 'shared/config/person';

export const FieldErrors = {
  passportIssueDateError: `Паспорт выдается не ранее чем с ${AGE_OF_PASSPORT_ISSUE} лет`,
  requiredError: 'Обязательное поле',
  experienceError: {
    car: (category: string | undefined) =>
      `Права ${category ? `категории ${category}` : ''} выдаются при достижении 18 лет`,
    motorcycle: 'Права категории А выдаются при достижении 16 лет ',
  },
  personName: 'Необходимо заполнить Фамилию, Имя и Отчество',
  userAgreement: 'Необходимо согласие с условиями',
};

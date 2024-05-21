import { AGE_OF_MAJORITY_MOTORCYCLE_LICENSE } from 'shared/config/person';

export const UpdateDriversTexts = {
  validationErrors: {
    driverBirthDateError: `Водитель не может быть младше ${AGE_OF_MAJORITY_MOTORCYCLE_LICENSE} лет`,
    fillField: 'Заполните поле',
    fioAndBirthdayTheSame: 'ФИО и Дата рождения совпадают с уже добавленным водителем',
    licenseTheSame: (fio: string | undefined) => `Серия и номер ВУ совпадают с уже добавленным водителем ${fio}`,
  },
};

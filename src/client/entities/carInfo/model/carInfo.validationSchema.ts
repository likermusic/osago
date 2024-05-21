import { Documents } from '@sravni/cosago-react-library/lib/constants';
import { CarDocumentsDictionary, CarIdentifyDictionary } from '@sravni/cosago-react-library/lib/dictionaries';
import {
  carDocumentNumberTestScheme,
  vehicleNumberScheme,
  dictionaryTestScheme,
  requiredCustomSelectScheme,
  validateCarBodyNumberSchema,
  validateConditionaly,
  validateDate,
  validateDateLaterThanGivenYearStartAndEarlierThanNow,
  vinNumberScheme,
} from '@sravni/cosago-react-library/lib/validationSchemes';
import type { AnySchema, TestContext } from 'yup';
import { mixed, object, string } from 'yup';

import type { Shape } from 'types/yup';

import { FieldErrors } from 'shared/lib/fields';

import type { CarInfoCommonFields, CarNumberLandingFormFields } from '../types';

// чтобы дата была с 1 июля 2018 года включая
const EPTS_DATE_START = new Date('2018-06-30');

export const CarFieldErrors = {
  incorrectDocumentObtainingDate: 'Не ранее года выпуска машины',
  incorrectEptsDateStart: 'Дата выдачи ЕПТС не ранее 1 июля 2018 года',
};

const validateConditionalyIfIdentifyType = (condition: Documents.CarIdentifyType, requiredSchema: AnySchema) =>
  validateConditionaly<CarInfoCommonFields>((v) => v === condition, requiredSchema, mixed())('identifyType');

const validateConditionalyCarNumber = validateConditionaly<CarInfoCommonFields>(
  (v) => v === Documents.ECarDocumentType.STS,
  vehicleNumberScheme().required('Введите номер транспортного средства'),
  vehicleNumberScheme(),
)('documentType');

const validateModification = mixed().test(
  'modification required if available',
  FieldErrors.requiredError,
  (option: CarInfoCommonFields['carModification']) => option?.value !== '',
);

export const validateDocumentIssueDate = () =>
  validateDateLaterThanGivenYearStartAndEarlierThanNow<CarInfoCommonFields>('carManufactureYear')(
    CarFieldErrors.incorrectDocumentObtainingDate,
  ).when('documentType', {
    is: (documentType: Documents.ECarDocumentType) => documentType === Documents.ECarDocumentType.EPTS,
    then: validateDate({
      notEarlierDate: EPTS_DATE_START,
      messageForNotEarlier: CarFieldErrors.incorrectEptsDateStart,
    }),
  });

const categoryValidation = () =>
  mixed().test(
    'required select',
    FieldErrors.requiredError,
    function test(this: TestContext, option: CarInfoCommonFields['category']) {
      if (!option?.value && !option?.data?.isPrefilled) {
        return this.createError({
          path: this.path,
          message: FieldErrors.requiredError,
        });
      }

      return true;
    },
  );

const validateCategoryIfMoreThanOneCategories = () =>
  validateConditionaly<CarInfoCommonFields>(
    (v) => (v?.categories?.length ? v?.categories?.length > 1 : false),
    categoryValidation(),
    mixed().nullable(),
  )('carModel');

export const FormFieldsValidationSchemaCarInfo = () =>
  object<App.Shape<CarInfoCommonFields>>({
    bodyNumber: validateConditionalyIfIdentifyType(Documents.CarIdentifyType.BodyNumber, validateCarBodyNumberSchema),
    carBrand: requiredCustomSelectScheme(),
    carManufactureYear: requiredCustomSelectScheme(),
    carModel: requiredCustomSelectScheme(),
    carModification: validateModification,
    carNumber: validateConditionalyCarNumber,
    carVinNumber: validateConditionalyIfIdentifyType(
      Documents.CarIdentifyType.VIN,
      vinNumberScheme().nullable().required(FieldErrors.requiredError),
    ),
    chassisNumber: validateConditionalyIfIdentifyType(
      Documents.CarIdentifyType.ChassisNumber,
      validateCarBodyNumberSchema,
    ),
    documentIssueDate: validateDocumentIssueDate(),
    documentNumber: carDocumentNumberTestScheme<CarInfoCommonFields>('documentType')().required(
      FieldErrors.requiredError,
    ),
    documentType: dictionaryTestScheme(CarDocumentsDictionary),
    enginePower: requiredCustomSelectScheme(),
    identifyType: dictionaryTestScheme(CarIdentifyDictionary),
    category: validateCategoryIfMoreThanOneCategories(),
  });

export const FormFieldsValidationSchemaCarNumberLanding = object<Shape<CarNumberLandingFormFields>>({
  carNumber: vehicleNumberScheme().required(FieldErrors.requiredError),
  vehicleType: string(),
});

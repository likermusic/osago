import { Documents } from '@sravni/cosago-react-library/lib/constants';

type TFieldsForMapping = Documents.ECarDocumentType | Documents.CarIdentifyType;

const MAP_FIELD_NAME: Record<TFieldsForMapping, string> = {
  [Documents.ECarDocumentType.EPTS]: 'ЭПТС',
  [Documents.ECarDocumentType.PTS]: 'ПТС',
  [Documents.ECarDocumentType.STS]: 'СТС',
  [Documents.CarIdentifyType.VIN]: 'VIN номер',
  [Documents.CarIdentifyType.BodyNumber]: 'Номер кузова',
  [Documents.CarIdentifyType.ChassisNumber]: 'Номер шасси',
};
type TValue = string | undefined | null;

const isFieldForMapping = (fieldName: string, value: TValue): value is TFieldsForMapping =>
  !!value && (fieldName === 'identifyType' || fieldName === 'documentType');

export const mapFieldsWithEnumToEventFieldName = (fieldName: string, value: TValue): TValue => {
  if (isFieldForMapping(fieldName, value)) {
    return MAP_FIELD_NAME[value];
  }

  return value;
};

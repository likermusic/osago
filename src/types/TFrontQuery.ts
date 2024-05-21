/*
 * тип TQuery основан на бековской Query за исключением полей о которых мы не знаем
 * + типизация бека имеет все поля необязательные и в дополнении к своему типу имеют null и undefined, что не позволяет нормально использовать бековскую кверю для типизации
 * используется для хранения данных в localStorage и последующего восстановления
 */

import type { TVehicleCategories } from 'commonTypes/categories';

export type TFrontQuery = WithUndefinedNested<{
  driversInfo: {
    driverAmount: 'unlimited' | 'limited';
    drivers: TFrontQueryDrivers[];
  } | null;
  modelId: number;
  modification: string;
  year: number;
  bodyNumber: string;
  policyStartDate: string;
  enginePower: number;
  vehicleCategory: TVehicleCategories;
  carNumber: string;
  chassisNumber: string;
  brandId: number;
  carDocument: TCarDocument | null;
  vin: string;
  userId?: string | number;

  insurer: (TFrontQueryUser & TUserContacts) | null;
  owner: TFrontQueryUser | null;
}>;

type TUserContacts = WithUndefinedNested<{
  phone: string;
  email: string;
}>;

export type TFrontQueryDrivers = WithUndefinedNested<{
  fullName: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;

  license: { date: string; number: string; series: string };

  previousInfo: TPreviousInfo | undefined;
}>;

type TPreviousInfo = WithUndefinedNested<{
  lastName: string;
  firstName: string;
  license: { number: string; series: string };
  fullName: string;
  middleName: string;
}>;

export type TFrontQueryUser = WithUndefinedNested<{
  lastName: string;
  middleName: string;
  firstName: string;
  fullName: string;
  passport: {
    series: string;
    number: string;
    issueDate: string;
  };
  birthDate: string;

  address: Address;
}>;

type Address = {
  data: Data;
  formattedAddress: string;
  formattedFiasLevel: string;
};

type Data = {
  flatNumber: string;
};

export type TFrontQueryDocumentType = 'ePts' | 'pts' | 'sts';

type TCarDocument = WithUndefinedNested<{
  date: string;
  number: string;
  documentType: TFrontQueryDocumentType;
  series: string;
}>;

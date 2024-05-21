import type { Documents } from '@sravni/cosago-react-library/lib/constants';

import type { TVehicleCategoriesLowerCase } from 'commonTypes/categories';

type TFullName = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
};

type TPassportUser = TFullName & {
  birthDate: string | undefined;
  passport: {
    number?: string;
    issueDate?: string | undefined;
    series?: string | null;
  };
};

type TInsurerOwner = TPassportUser & {
  email?: string;
  phone?: string;
  registrationAddress: string | undefined;
  formattedFiasLevel: string | undefined;
};

export type TDriver = TFullName & {
  birthDate: string | undefined;
  license: {
    date: string;
    number?: string;
    series?: string | null;
  };
  previousInfo: TFullName & {
    license?: {
      number?: string;
      series?: string;
    };
  };
};

type TDriversInfo = {
  driverAmount: 'limited' | 'unlimited';
  drivers: TDriver[] | TPassportUser[];
  unnamedDrivers: { age: 0; experience: 0 };
};

export type TBaseQuery = {
  bodyNumber?: string;
  brandId?: number | undefined;
  carDocument: {
    date: string | undefined;
    documentType: Documents.ECarDocumentType | undefined;
    number?: string | undefined;
    series?: string | undefined | null;
  };
  carNumber: string;
  chassisNumber?: string;
  driversInfo: TDriversInfo;
  enginePower: number | undefined;
  getting: string | undefined;
  insurer: TInsurerOwner;
  isApproximation: false; // Приблизительный расчёт, должен всегда быть false
  isProlongation: false;
  isResident: true;
  modelId: number | undefined;
  modification: string | undefined;
  owner: TInsurerOwner;
  platform: string;
  policyStartDate: string | undefined;
  registration: string | undefined;
  usageMonthsPerYear: 10;
  userId: number | undefined;
  vin?: string;
  vehicleCategory: TVehicleCategoriesLowerCase;
  year: number | undefined;
  benefitCode?: string;
};

export type TOrderQuery = TBaseQuery & {
  save: {
    productId: number | undefined;
    searchId: string | null;
    // не передаем беку originalCompanyId и isRoute, оно формируется на беке автоматически https://sravni-corp.atlassian.net/browse/OS-8073?focusedCommentId=287693
    // originalCompanyId - компания с которой выбрали проброс, первый заказ originalCompanyId = nul
    isRoute: undefined;
    originalCompanyId: undefined;
  };
};

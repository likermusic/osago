import type { Documents } from '@sravni/cosago-react-library/lib/constants';
import type { ICustomSelectOption, ICustomSelectValue, VehicleType } from '@sravni/cosago-react-library/lib/types';

import type { Auto } from 'commonTypes/api/auto';

export type TBrandData = { alias: string; isPrefilled?: boolean };
type TCustomSelectValueWithPrefilledDataSupport = ICustomSelectValue<{ isPrefilled?: boolean }>;
export type TModelData = TCustomSelectValueWithPrefilledDataSupport & { categories?: string[] };

export type CarInfoCommonFields = {
  carNumber: string;
  carBrand?: Nullable<ICustomSelectValue<TBrandData>>;
  carModel?: Nullable<TModelData>;
  carManufactureYear?: Nullable<TCustomSelectValueWithPrefilledDataSupport>;
  enginePower?: Nullable<TCustomSelectValueWithPrefilledDataSupport>;
  documentType: Documents.ECarDocumentType | undefined;
  documentNumber: string;
  documentIssueDate: string;
  bodyNumber: string;
  chassisNumber: string;
  carVinNumber: string;
  identifyType: Documents.CarIdentifyType | '';
  carModification?: ICustomSelectValue;
  category?: TCustomSelectValueWithPrefilledDataSupport;
};

export type TObjectStore<T extends Record<string, unknown> | never = never> = {
  [key: string]: Array<ICustomSelectOption<T>>;
};

export type CarInfoEntityReducer = Form.Single<CarInfoCommonFields> & {
  dictionaries: {
    brands: Array<ICustomSelectOption<TBrandData>>;
    models: TObjectStore;
    years: TObjectStore;
    powers: TObjectStore;
    modification: TObjectStore;
  };
  lastPrefilledValues: Nullable<
    Partial<Pick<CarInfoCommonFields, 'carNumber' | 'carVinNumber' | 'bodyNumber' | 'chassisNumber' | 'documentNumber'>>
  >;
  isCarInfoLoaded: boolean | undefined;
  shouldShowCarNumber?: boolean;
  vehicleType: VehicleType;
};

export type TCarInfoIncomingDictionaryMappingKey = {
  id?: Nullable<string | number>;
};

export type CarInfoIncomingDictionaries = {
  brand: TCarInfoIncomingDictionaryMappingKey;
  brands: Auto.GetBrands;
  model: TCarInfoIncomingDictionaryMappingKey;
  models: Auto.AutoInfo['models'];
  modifications: Auto.AutoInfo['modifications'];
  power?: Nullable<Auto.AutoInfo['year']>;
  powers: Auto.AutoInfo['powers'];
  year?: Nullable<Auto.AutoInfo['year']>;
  years: Auto.AutoInfo['years'];
};

export type CarNumberLandingFormFields = { carNumber: string; vehicleType: VehicleType };

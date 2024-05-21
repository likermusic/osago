import type { Prolongation } from 'commonTypes/api/prolongation';

type TProlongationType = 'sravniProlongation' | 'shortProlongation' | 'lastSearch' | 'newShortProlongation';
export type TFoundedProlongationPolicy = {
  prolongationPolicyByCarNumber: Nullable<{
    maskedPhone?: Nullable<string>;
    userName?: Nullable<string>;
    brandName?: Nullable<string>;
    modelName?: Nullable<string>;
    carNumber?: Nullable<string>;
    orderHash?: Nullable<string>;
    companyId?: number;
    companyName?: Nullable<string>;
    price?: number;
    previousPolicyNumber?: Nullable<string>;
    vehicleYear?: Nullable<number>;
    policyEndDate?: string;
    drivers?: Nullable<
      Array<{
        fullName?: Nullable<string>;
      }>
    >;
    driversAmount?: number;
    type?: TProlongationType;
    description?: Nullable<string>;
  }>;
};

export type TDriversFromServer = Array<{
  fullName?: Nullable<string>;
}>;

export interface IIcons {
  userName: JSX.Element;
  maskedPhone: JSX.Element;
  auto: JSX.Element;
  policyEndDate: JSX.Element;
  drivers: JSX.Element;
}

export type IInfo = {
  icon: keyof IIcons;
  title: string;
  subtitle?: string;
};

export type TMapPolicyData = {
  brandName: Nullable<string>;
  modelName: Nullable<string>;
  maskedPhone: Nullable<string>;
  userName: Nullable<string>;
  policyEndDate: Nullable<string>;
  drivers: Nullable<TDriversFromServer>;
  vehicleYear: Nullable<number>;
};

export type TMapPolicyDataMapper = (
  params: Nullable<Partial<TMapPolicyData>>,
) => Record<Required<Prolongation.FoundedProlongationPolicyResponse>['type'], IInfo[]>;

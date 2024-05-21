import type { ICustomSelectOption, IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';

export type TStep =
  | 'Loading'
  | 'Auth'
  | 'ChoosePolicy'
  | 'EnterPolicyByYourself'
  | 'Success'
  | 'MaxPoliciesRegistered'
  | 'SentForChecking';

type TPolicy = ICustomSelectOption & { orderId?: Nullable<string>; productType?: Nullable<string> };

export type TRaffleRegistrationState = {
  policies: TPolicy[];
  // Признак, что у юзера зарегистрировано макс. кол-во полисов
  isMaxTicketsRegistred: Nullable<boolean>;
  lotteryName: Nullable<string>;
  registratedId: Nullable<number>;
};

export type TGetPoliciesForRaffleResponse = Omit<TRaffleRegistrationState, 'lotteryName' | 'registratedId'>;

export type TPolicyType =
  | 'Osago'
  | 'Kasko'
  | 'MortgageInsurance'
  | 'PropertyInsurance'
  | 'AccidentInsurance'
  | 'TravelInsurance';

export type TPolicyTypeField = ICustomSelectOption & { value: TPolicyType };

export type TRaffleRegistationFields = {
  policiesAutocomplete: Nullable<TPolicy>;
  policyType: Nullable<TPolicyTypeField>;
  policyNumber: string;
};

export type TInteractiveStepProps = {
  FieldConstructor: (props: IFieldFactoryProps) => Nullable<JSX.Element>;
  setStep: (step: TStep) => void;
  rulesLink?: string;
};

export type TTextStepProps = {
  title: string;
  subtitle: string;
  onClose: () => void;
  linkText?: string;
  isSubtitleBold?: boolean;
};

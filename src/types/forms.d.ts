declare namespace Form {
  type MultipleFormsData<T> = Record<string, { isFullFilled: boolean; data: Nullable<T> }>;

  export type Stepper = {
    isActive: boolean;
    isFullFilled: boolean;
    multipleFormsData?: MultipleFormsData;
    isMultiDrive?: boolean;
  };

  export type Single<T> = {
    isActive: boolean;
    isFullFilled: boolean;
    data: Nullable<T>;
    defaults: T;
  };

  export type Multi<T extends Record<string, unknown>> = {
    data: Nullable<T>;
    defaults: T;
    isActive: boolean;
    isFullFilled: boolean;
    multipleFormsData: MultipleFormsData<T>;
  };
}

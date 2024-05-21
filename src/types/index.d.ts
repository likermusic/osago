import('./react-app-env');

/** мы используем динамический импорт для того что бы эи типы были доступны при компиляции
 * https://stackoverflow.com/questions/45420448/how-to-import-external-type-into-global-d-ts-file */
type DeviceInfo = import('@sravni/koa-utils/lib/middlewares/device').DeviceInfo;
type IInsuranceCompaniesFullMapBFF = import('commonTypes/insuranceCompanies').IInsuranceCompaniesFullMapBFF;
type ILocation = import('@sravni/types/lib/locations').ILocation;
type TFrontQuery = import('commonTypes/TFrontQuery').TFrontQuery;
type NextPages = import('./nextPagesData');
type VehicleType = import('@sravni/cosago-react-library/lib/types').VehicleType;
type ParameterizedContext = import('koa');
type React = import('@types/react');
type SiteSettings = import('@sravni/types/lib/sitesettings').ISiteSettings;
type ThemeName = import('@sravni/design-system-theme');
type User = import('@sravni/types/lib/auth').IUser;
type YupAnySchema = import('yup').AnySchema;
type Store = import('../client/app/MyApp/model/store').GlobalState;
type Dispatch = import('../client/app/MyApp/model/store').AppDispatch;
type DaData = import('./dadata');
type Forms = import('./forms').Forms;
type InsuranceCompanies = import('./insuranceCompanies');
type SEOAndSettings = import('commonTypes/api/SEOAndSettings').SEOAndSettings;
type IInsuranceCompaniesRatings = import('commonTypes/insuranceCompanies').IInsuranceCompaniesRatings;
type IAbTesting = import('@sravni/ab-testing-sdk/lib/browser');
type TWhiteLabel = import('./whitelabel').Whitelabel.TWhiteLabel;

declare type ThunkResult<T> = import('../client/app/MyApp/model/store').ThunkResult<T>;
declare namespace App {
  export type Shape<T> = Record<keyof T, YupAnySchema>;
  export type InferComponentProps<HOC> = HOC extends (component: React.ComponentType<infer P>) => any ? P : never;

  export interface ExtendedIncomingMessage<B extends Record<string, unknown> = unknown>
    extends import('http').IncomingMessage {
    __USER__?: User;
    __SEO__?: SEOAndSettings.PostMetadata;
    __REVIEWS__?: IReviewsApi;
    __LOCATIONS__?: ILocation[];
    __SELECTED_LOCATION__?: ILocation;
    __CSRF__?: string;
    __DEVICE_INFO__?: DeviceInfo;
    __SITE_SETTINGS__?: SiteSettings;
    __THEME__?: ThemeName;
    __PAGE_DATA__?: NextPages.Data;
    __LANDING_FRIEND__?: string;
    __SEO_META__?: {
      locationId?: number;
      company?: number;
    };
    __INSURANCE_COMPANIES__?: {
      companies: IInsuranceCompaniesFullMapBFF;
      idList: number[];
    };
    __APP_CONFIG__: {
      appType: 'sravni.ru' | 'wl';
      isPaidTraffic: boolean;
      isNewProlongation: boolean;
      gtmKey: string;
      openPaymentLinkInCurrentTab: boolean;
      originalUrl: string;
      benefitCode?: string;
      isMobileAppRaffle: boolean;
    };
    __WL__?: {
      partnerId?: number;
      analytics: TWhiteLabel['analytics'];
      nonPartnerWl: TWhiteLabel['nonPartnerWl'];
    };
    __VEHICLE_TYPE__?: VehicleType;
    __INSURANCE_COMPANIES_ALL_RATINGS__?: IInsuranceCompaniesRatings;
    __HIDDEN_INSURANCE_COMPANIES__?: number[];
    __AB_TESTING__?: {
      abTestingInfo: IAbTesting.IAbTestingInfo | null;
      analyticsStatistics: IAbTesting.IAbTestingStatistics | null;
      isEsiaBVariant: boolean;
    };
    __BENEFIT_CODE__?: string;
    __FORM_OTP_DATA__?: TFrontQuery;
    body?: B;
    url?: string;
  }

  export interface IKoaContext extends ParameterizedContext {
    req: ExtendedIncomingMessage;
  }

  export interface ReduxNextPageContext<Q = Record<string, string>>
    extends Partial<Pick<IKoaContext, 'req' | 'res'>>,
      Omit<NextPageContext, 'query' | 'req' | 'res'> {
    store?: import('../client/app/MyApp/model/store').AppStore;
    error?: IError;
    query: Q;
  }

  export type ReduxAppContext<Q = Record<string, string>> = Omit<AppContext, 'ctx'> & {
    ctx: ReduxNextPageContext<Q>;
  };

  export type ExtendedContext<
    P extends Record<string, unknown> = unknown,
    Q extends Record<string, unknown> = unknown,
    B extends Record<string, unknown> = unknown,
  > = Omit<Context, 'query'> &
    NextParamContext &
    KoaParamContext & {
      req: ExtendedIncomingMessage<B>;
      params: P;
      query: Q;
    };
}

declare type FC<P = {}> = React.FC<
  React.PropsWithChildren<
    P & {
      className?: string;
    }
  >
>;
declare type Nullable<T> = T | null;

/** при использовании необходимо типы объявлять через type, а не через interface либо доработать WithUndefinedNested **/
declare type WithUndefinedNested<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P] extends Record<string, unknown> ? WithUndefinedNested<T[P]> : T[P] | undefined;
};

declare type RequiredAndNonNullableFields<T, K extends keyof T> = Omit<T, K> & {
  [F in K]-?: NonNullable<T[F]>;
};

declare module 'trim-html' {
  export interface IOptions {
    limit?: number;
    suffix?: string;
    wordBreak?: boolean;
    preserveTags?: boolean;
  }
  export interface IResult {
    html: string;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export default (text: string, options?: IOptions) => IResult;
}

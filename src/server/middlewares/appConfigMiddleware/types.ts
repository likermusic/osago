export interface IAppConfig {
  appType: 'sravni.ru' | 'wl';
  isPaidTraffic: boolean;
  isNewProlongation: boolean;
  gtmKey: string;
  openPaymentLinkInCurrentTab: boolean;
  originalUrl: string;
  benefitCode?: string;
}

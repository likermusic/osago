import { generateSeoPageRoute } from '../commonUtils/routeGenerator';

import type { IMatch } from './types';

const ROOT = '/osago';

export const generatePageRoute = (pageUrl?: string, withoutRoot?: boolean) =>
  new RegExp(`^${withoutRoot ? '' : ROOT}${pageUrl ?? ''}/?$`);

export const SUMMARY_ROUTE = [generatePageRoute('/summary')];
export const ORDER_ROUTE = [generatePageRoute('/order')];
export const CANARY_ROUTE = [generatePageRoute('/canary')];
export const MAIN_ROUTE = [generatePageRoute()];
export const MOTORCYCLE_LANDING_ROUTE = [generatePageRoute('/motocikl')];
export const TRIGGER_COMMUNICATION_LOADER_ROUTE = [generatePageRoute('/loader')];
export const SUCCESS_ROUTE = [generatePageRoute('/success')];
export const ANKETA_ROUTE = [generatePageRoute('/anketa')];
export const PROPOSITIONS_ROUTE = [generatePageRoute('/propositions')];
export const FAILURE_ROUTE = [generatePageRoute('/failure')];
export const WIN3CARS_ROUTE = [generatePageRoute('/win-million-car', true)];
export const ERROR_ROUTE = '/error';
export const WL_ROUTE = [generatePageRoute('/wl-new')];

export const APP_ROUTES = {
  main: ROOT,
  motorcycle: `${ROOT}/motocikl`,
  failure: `${ROOT}/failure`,
  success: `${ROOT}/success`,
  propositions: `${ROOT}/propositions`,
  anketa: `${ROOT}/anketa`,
  summary: `${ROOT}/summary`,
  order: `${ROOT}/order`,
  win3cars: `/win-million-car`,
  triggerCommunicationLoader: `${ROOT}/loader`,
  wlNew: `/wl-new`,
} as const;

// SEO для лендинга
export const SEO_UNKNOWN_URLS = [generateSeoPageRoute(ROOT, ['seoParam_p'])];
export const SEO_CARS_URLS = [
  generateSeoPageRoute(ROOT, ['brand_p', 'modelOrProductLocation_p']),
  generateSeoPageRoute(ROOT, ['brand_p', 'modelOrProductLocation_p', 'productLocation_p']),
];

export const SEO_COMPANIES_URLS_TEMPLATE = [
  'avtostrakhovanie',
  'bez-ogranichenij',
  'cherez-internet',
  'elektronnoe',
  'elektronnyj-polis',
  'kalkuljator',
  'kupit',
  'kupit-elektronnoe',
  'kupit-onlajn',
  'kupit-polis',
  'oformit',
  'oformit-onlajn',
  'onlajn',
  'onlajn-kalkuljator',
  'polis',
  'polis-onlajn',
  'priobresti',
  'prodlit',
  'rasschitat',
  's-dostavkoy',
  'zakazat',
  'zastrakhovat-onlajn',
];

const SEO_COMPANIES_URLS = [
  ...SEO_COMPANIES_URLS_TEMPLATE.map((key) => generateSeoPageRoute(ROOT, ['insuranceCompany_p', key])),
  ...SEO_COMPANIES_URLS_TEMPLATE.map((key) =>
    generateSeoPageRoute(ROOT, ['insuranceCompany_p', key, 'productLocation_p']),
  ),
];

export const SEO_LOCATIONS_URLS = [
  ...['bez-ogranichenij', 'onlajn', 'prodlit', 's-dostavkoy'].map((key) =>
    generateSeoPageRoute(ROOT, [key, 'productLocation_p']),
  ),
  generateSeoPageRoute(ROOT, ['productLocation_p']),
];

export const SEO_NO_PARAMS_URLS = [
  ['bez-prav'],
  ['deshovoe'],
  ['dlja-regionov'],
  ['gruzovye-avto'],
  ['kalkuljator-rsa'],
  ['kamaz'],
  ['kruglosutochno'],
  ['kvadrocikl'],
  ['motocikl'],
  ['otzyvy'],
  ['proverka-kbm'],
  ['proverka-kbm', 'izmenit-kbm'],
  ['proverka-kbm', 'kalkulyator'],
  ['proverka-kbm', 'opredelit-klass-strahovaniya'],
  ['proverka-kbm', 'skidka-za-bezavariynuyu-ezdu'],
  ['proverka-kbm', 'skidki-osago-po-stazhu'],
  ['proverka-kbm', 'uznat-klass-voditelya'],
  ['rsa'],
  ['spectehnika'],
  ['traktor'],
  ['vybor-avto'],
  ['vybor-regiona'],
  ['bez-dopolnitelnih-uslug'],
  ['bez-stazha'],
  ['dlja-novichka'],
  ['tekhosmotr'],
].map((keys) => generateSeoPageRoute(ROOT, [...keys, 'productLocation_p']));

export const SEO_MATCHER: IMatch = {
  urls: [...SEO_UNKNOWN_URLS, ...SEO_CARS_URLS, ...SEO_COMPANIES_URLS, ...SEO_LOCATIONS_URLS, ...SEO_NO_PARAMS_URLS],
  paramsExtractor: (params) => ({
    insuranceCompany: params.insuranceCompany,
    productLocation: params.productLocation,
    brandAlias: params.brand,
    modelOrProductLocation: params.modelOrProductLocation,
    seoParam: params.seoParam,
  }),
};

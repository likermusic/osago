export const PARTNERS_IDS = {
  alfaStrahovanie: 2101,
  autoru: 1714, // https://auto.ru/promo/osago/
  beeline: 2345,
  cardsMobileApp: 1651, // https://cardsmobile.ru/
  eldorado: 2659,
  ingos: 2743,
  mvideo: 2756,
  opera: 1747, // https://deals.opera.com/ru/osago
  renins: 1715,
  rgs: 3242,
  rosneft: 2508,
  sberAuto: 2050,
  shell: 1752,
  sovcombank: 2678,
  svyaznoy: 1921,
  svyaznoyOffice: 2830,
  'tatneft-zenit': 1778,
  twiga: 2477,
  calcus: 912,
  exist: 5780,
  frisbi: 2706,
  avito: 2421,
  osk: 2834,
  shtrafyGibdd: 8251,
  otp: 254,
};

export const GTM_KEYS = {
  'sravni.ru': 'GTM-PMDFG9',
  twiga: 'GTM-P5SRDQG',
  wl: 'GTM-58R4BJK',
  beeline: 'GTM-TBZZG7F',
  eldorado: 'GTM-MSR39TG',
  sberAuto: 'GTM-T72W9F7',
};

export const MAP_PARTNERS_TO_GTM = {
  [PARTNERS_IDS.twiga]: GTM_KEYS.twiga,
  [PARTNERS_IDS.eldorado]: GTM_KEYS.eldorado,
  [PARTNERS_IDS.sberAuto]: GTM_KEYS.sberAuto,
  [PARTNERS_IDS.beeline]: GTM_KEYS.beeline,
};

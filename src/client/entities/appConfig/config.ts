// Идентификаторы экспериментов которые проводятся на проекте

import { TEST_ANKETA_CONTACT_NUMBER } from 'shared/config/anketaContactAb';
import { KBM_FIELD_AB_VALUE } from 'shared/config/kbmFieldAB';

export const AB_TEST_EXPERIMENTS = {
  TEST_MOCK_VARIANT_ID: ['0', '1', '2'] as const, // <-Для юнит теста и сториса, не удалять,
  'd40f200b-6c08-4f2d': ['0', '1'] as const, // <-Для юнит теста и сториса, не удалять
  'a72011a5-9344-4bb8': ['0', '1'] as const, // тест ESIA
  [TEST_ANKETA_CONTACT_NUMBER]: ['0', '1'] as const, // тест переноса шага контактов
  [KBM_FIELD_AB_VALUE]: ['0', '1'], // тест поля кбм
};

export type TExperimentConfig = typeof AB_TEST_EXPERIMENTS;
export type TExperimentLabel = keyof TExperimentConfig;
export type TExperimentValues<NAME extends TExperimentLabel> = TExperimentConfig[NAME];

export type TVariants<NAME extends TExperimentLabel> = {
  [K in TExperimentValues<NAME>[number]]: K;
};

export type TOneOfVariant<NAME extends TExperimentLabel> = keyof TVariants<NAME>;

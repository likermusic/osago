import type { Auto } from 'commonTypes/api/auto';
import type { Query } from 'commonTypes/api/query';
import {
  FULL_MAPPED_QUERY,
  MAPPED_QUERY_EMPTY,
  MAPPED_QUERY_WITHOUT_MODEL,
  FULL_QUERY,
  QUERY_WITHOUT_MODEL,
} from 'mocks/mapCalculationQueryToFormCarInfo';

import { getExistCarInfoDataInDictionaries } from '../getExistCarInfoDataInDictionaries';

const NULLABLE_CAR_DATA = {
  brandId: null,
  modelId: null,
  year: null,
  enginePower: null,
};

const MAPPED_EMPTY_DATA = {
  carInfo: MAPPED_QUERY_EMPTY,
  ...NULLABLE_CAR_DATA,
};

const FULL_DICTIONARIES: Auto.TCalculationQueryDictionary = {
  brands: [{ id: FULL_QUERY.brandId }],
  models: [{ id: FULL_QUERY.modelId }],
  years: [FULL_QUERY.year],
  powers: [FULL_QUERY.enginePower],
  modifications: [{ name: FULL_QUERY.modification }],
};

const FULL_CAR_DATA = {
  brandId: FULL_QUERY.brandId,
  modelId: FULL_QUERY.modelId,
  year: FULL_QUERY.year,
  enginePower: FULL_QUERY.enginePower,
};

const MAPPED_FULL_DATA = {
  carInfo: {
    ...FULL_MAPPED_QUERY,
    carModel: {
      value: FULL_QUERY.modelId,
      categories: [],
    },
  },
  ...FULL_CAR_DATA,
};

const PARTIAL_DICTIONARIES: Auto.TCalculationQueryDictionary = {
  ...FULL_DICTIONARIES,
  years: [FULL_QUERY.year - 20, FULL_QUERY.year + 20],
  powers: [FULL_QUERY.enginePower * 2, FULL_QUERY.enginePower + 20],
};

describe('WHEN "getExistCarInfoDataInDictionaries" is called', () => {
  it.each([[null], [undefined], [{}]])(
    'AND data was provided as %p, MUST return empty car info and car data based on dictionaries',
    (input) => {
      expect(
        getExistCarInfoDataInDictionaries(
          input as Query.TRestoreCalculationQueryResponse,
          input as Auto.TCalculationQueryDictionary,
        ),
      ).toEqual(MAPPED_EMPTY_DATA);
    },
  );

  it('AND data was fully provided, MUST return car info redux state and car data based on dictionaries', () => {
    expect(getExistCarInfoDataInDictionaries(FULL_QUERY, FULL_DICTIONARIES)).toEqual(MAPPED_FULL_DATA);
  });

  it('AND data was provided partially without model, MUST return car info redux state', () => {
    expect(getExistCarInfoDataInDictionaries(QUERY_WITHOUT_MODEL, FULL_DICTIONARIES)).toEqual({
      carInfo: MAPPED_QUERY_WITHOUT_MODEL,
      ...FULL_CAR_DATA,
      modelId: null,
    });
  });

  it('AND data was fully provided AND car power and year not exist in dictionaries MUST return car info redux state  and car data based on dictionaries', () => {
    expect(getExistCarInfoDataInDictionaries(FULL_QUERY, PARTIAL_DICTIONARIES)).toEqual({
      carInfo: {
        ...FULL_MAPPED_QUERY,
        carModel: {
          value: FULL_QUERY.modelId,
          categories: [],
        },
        carManufactureYear: null,
        enginePower: null,
      },
      ...FULL_CAR_DATA,
      enginePower: null,
      year: null,
    });
  });
});

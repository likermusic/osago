import type { ApiSchemas } from 'commonTypes/api/ApiSchemas';
import { INSURANCE_COMPANIES_IDS } from 'constants/INSURANCE_COMPANIES_IDS';

import type { IOfferTag } from 'shared/types';

import { mapTags, mapTagsAndAddAwards } from '../mapTags';

const TAGS_CORRECT_DATA: ApiSchemas.IUpperTag[] = [
  {
    color: 'Orange',
    colorVariant: 'Primary',
    title: 'title',
    type: 'CheapestCompany',
  },
];

const TAGS_CORRECT_DATA_TRANSFORMED: IOfferTag[] = [
  {
    color: 'orange',
    variant: 'primary',
    isTooltip: false,
    text: undefined,
    title: 'title',
    type: 'CheapestCompany',
  },
];

const TAGS_DEFAULT_DATA = [
  {
    color: undefined,
    variant: undefined,
    isTooltip: false,
    title: undefined,
    text: undefined,
    type: 'None',
  },
];

describe('WHEN "mapTags" is called', () => {
  it.each([undefined, null])('AND data was not array as %p, MUST return empty array', (alerts) => {
    expect(mapTags(alerts as unknown as ApiSchemas.IUpperTag[])).toEqual([]);
  });

  it.each([[[null]], [[undefined]], [[{}]], [['']]])(
    'AND data was provided as %p, MUST return default value',
    (alerts) => {
      expect(mapTags(alerts as unknown as ApiSchemas.IUpperTag[])).toEqual(TAGS_DEFAULT_DATA);
    },
  );

  it('AND data was fully provided, MUST normalize correctly', () => {
    expect(mapTags(TAGS_CORRECT_DATA)).toEqual(TAGS_CORRECT_DATA_TRANSFORMED);
  });
});

describe('WHEN "mapTagsAndAddAwards" is called', () => {
  it.each([undefined, null])(
    'AND alerts was not array as %p AND company not need award, MUST return empty array',
    (alerts) => {
      expect(mapTagsAndAddAwards(alerts as unknown as ApiSchemas.IUpperTag[], 1234)).toEqual([]);
    },
  );

  it.each([undefined, null])(
    'AND alerts was not array as %p AND insurance should not has award, MUST return alertsx with sravni award',
    (alerts) => {
      expect(mapTagsAndAddAwards(alerts as unknown as ApiSchemas.IUpperTag[], INSURANCE_COMPANIES_IDS.sber)).toEqual(
        [],
      );
    },
  );

  it('AND alerts was fully provided AND insurance should not has award, MUST normalize correctly', () => {
    expect(mapTagsAndAddAwards(TAGS_CORRECT_DATA, INSURANCE_COMPANIES_IDS.sber)).toEqual([
      ...TAGS_CORRECT_DATA_TRANSFORMED,
    ]);
  });
});

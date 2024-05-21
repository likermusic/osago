import { mockAppDispatch } from 'mocks/helpers';

import { getIsNeededABVariantThunk } from '../getIsNeededABVariantThunk';

const EXPERIMENTS_MOCK = '123.1|1234.2';

const getState = (statistics: unknown) => () =>
  ({
    appConfig: {
      analytics: {
        analyticsABTestStatistics: {
          statistics,
        },
      },
    },
  } as Store);

describe('WHEN "getIsNeededABVariantThunk" is called', () => {
  it.each([undefined, null, ''])(
    'AND all args were not provided AND state is falsy value, MUST return false',
    (statistics) => {
      expect(getIsNeededABVariantThunk('', '')(mockAppDispatch, getState(statistics), undefined)).toEqual(false);
    },
  );

  it('AND experiments is not valid, MUST return false', () => {
    expect(getIsNeededABVariantThunk('123', '1')(mockAppDispatch, getState('not valid'), undefined)).toEqual(false);
  });

  it('AND experimentName AND variant does not exist in experiment, MUST return false', () => {
    expect(getIsNeededABVariantThunk('000', '1')(mockAppDispatch, getState(EXPERIMENTS_MOCK), undefined)).toEqual(
      false,
    );
  });

  it('AND experimentName AND variant exist in experiment, MUST return true', () => {
    expect(getIsNeededABVariantThunk('123', '1')(mockAppDispatch, getState(EXPERIMENTS_MOCK), undefined)).toEqual(true);
    expect(getIsNeededABVariantThunk('1234', '2')(mockAppDispatch, getState(EXPERIMENTS_MOCK), undefined)).toEqual(
      true,
    );
  });
});

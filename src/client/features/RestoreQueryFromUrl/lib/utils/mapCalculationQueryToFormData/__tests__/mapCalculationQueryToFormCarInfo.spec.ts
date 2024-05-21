import type { Query } from 'commonTypes/api/query';
import {
  FULL_MAPPED_QUERY,
  FULL_QUERY,
  MAPPED_QUERY_EMPTY,
  MAPPED_QUERY_WITHOUT_CAR_DOCUMENT,
  MAPPED_QUERY_WITHOUT_MODEL,
  QUERY_WITHOUT_CAR_DOCUMENT,
  QUERY_WITHOUT_MODEL,
} from 'mocks/mapCalculationQueryToFormCarInfo';

import { mapCalculationQueryToFormCarInfo } from '../mapCalculationQueryToFormCarInfo';

describe('WHEN "mapCalculationQueryToFormCarInfo" is called', () => {
  it.each([[null], [undefined], [{}]])(
    'AND data was provided as %p, MUST return empty car info redux state',
    (input) => {
      expect(mapCalculationQueryToFormCarInfo(input as Query.TRestoreCalculationQueryResponse)).toEqual(
        MAPPED_QUERY_EMPTY,
      );
    },
  );

  it('AND data was fully provided, MUST return car info redux state', () => {
    expect(mapCalculationQueryToFormCarInfo(FULL_QUERY)).toEqual(FULL_MAPPED_QUERY);
  });

  it('AND data was provided partially without car document, MUST return car info redux state', () => {
    expect(mapCalculationQueryToFormCarInfo(QUERY_WITHOUT_CAR_DOCUMENT)).toEqual(MAPPED_QUERY_WITHOUT_CAR_DOCUMENT);
  });

  it('AND data was provided partially without model, MUST return car info redux state', () => {
    expect(mapCalculationQueryToFormCarInfo(QUERY_WITHOUT_MODEL)).toEqual(MAPPED_QUERY_WITHOUT_MODEL);
  });

  it('AND carDocument is pts, MUST return car info redux state', () => {
    expect(
      mapCalculationQueryToFormCarInfo({
        ...FULL_QUERY,
        carDocument: {
          series: '',
          number: '164302051666247',
          date: '2022-10-20T00:00:00',
          documentType: 'ePts',
        },
      }),
    ).toEqual({
      ...FULL_MAPPED_QUERY,
      documentIssueDate: '20.10.2022',
      documentNumber: '164302051666247',
      documentType: 'ePts',
    });
  });
});

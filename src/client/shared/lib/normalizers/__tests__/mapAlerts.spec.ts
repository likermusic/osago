import type { ApiSchemas } from 'commonTypes/api/ApiSchemas';
import { INSURANCE_COMPANIES_IDS } from 'constants/INSURANCE_COMPANIES_IDS';
import { ALERT_CORRECT_DATA, ALERT_CORRECT_DATA_TRANSFORMED, ALERT_DEFAULT_DATA } from 'mocks/Alerts';

import { mapAlerts, mapAlertsAndAddAwards } from '../mapAlerts';

describe('WHEN "mapAlerts" is called', () => {
  it.each([undefined, null])('AND data was not array as %p, MUST return empty array', (alerts) => {
    expect(mapAlerts(alerts as unknown as ApiSchemas.IAlert[])).toEqual([]);
  });

  it.each([[[null]], [[undefined]], [[{}]], [['']]])(
    'AND data was provided as %p, MUST return default value',
    (alerts) => {
      expect(mapAlerts(alerts as unknown as ApiSchemas.IAlert[])).toEqual(ALERT_DEFAULT_DATA);
    },
  );

  it('AND data was fully provided, MUST normalize correctly', () => {
    expect(mapAlerts(ALERT_CORRECT_DATA)).toEqual(ALERT_CORRECT_DATA_TRANSFORMED);
  });
});

describe('WHEN "mapAlertsAndAddAwards" is called', () => {
  it.each([undefined, null])(
    'AND alerts was not array as %p AND company not need award, MUST return empty array',
    (alerts) => {
      expect(mapAlertsAndAddAwards(alerts as unknown as ApiSchemas.IAlert[], 1234)).toEqual([]);
    },
  );

  it.each([undefined, null])(
    'AND alerts was not array as %p AND insurance should not has award, MUST return alertsx with sravni award',
    (alerts) => {
      expect(mapAlertsAndAddAwards(alerts as unknown as ApiSchemas.IAlert[], INSURANCE_COMPANIES_IDS.sber)).toEqual([]);
    },
  );

  it('AND alerts was fully provided AND insurance should not has award, MUST normalize correctly', () => {
    expect(mapAlertsAndAddAwards(ALERT_CORRECT_DATA, INSURANCE_COMPANIES_IDS.sber)).toEqual([
      ...ALERT_CORRECT_DATA_TRANSFORMED,
    ]);
  });
});

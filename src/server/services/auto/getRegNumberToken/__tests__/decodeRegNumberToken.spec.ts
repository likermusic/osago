import { parseUTMCookie } from '@sravni/utils/lib/analytics';

import { mockAxiosGet } from 'mocks/helpers';

import { readPartnerCookie } from 'entities/appConfig/lib/prepareAnalyticsData/readPartnerCookie';

import { mapUTM } from '../../../../utils/analytics/mapUTM';
import type { IDecodeRegNumberToken } from '../getRegNumberToken';
import { decodeRegNumberToken } from '../getRegNumberToken';

describe('WHEN "decodeRegNumberToken" is called', () => {
  const query: IDecodeRegNumberToken = {
    regNumberToken: 'c912tt34',
    utm: mapUTM(parseUTMCookie('utmccn=utmccn|utmcct=utmcct|utmcmd=utmcmd|utmcsr=utmcsr|utmctr=utmctr')),
    partnerUtm: readPartnerCookie(
      'sid=&us=&um=microwidget_links&uc=microwidget_osago_&r=&l=http%3a%2f%2fosago-1232.qa.sravni-te&p_offer_id=1064&aff_id=1562&aff_sub=6&source=1767&tid=1023e9cecfbc545d0b71592f0a976d&targeted=True',
    ),
  };

  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({ data: '' });
  });

  it('MUST do request to osagogateway service for decoded auto number by token', async () => {
    await decodeRegNumberToken(query);

    expect(mockAxiosGet).toHaveBeenCalledWith(
      '<OSAGOGATEWAY>/auto/v1/regnumber-token-info?regNumberToken=c912tt34&utm.campaign=utmccn&utm.medium=utmcmd&utm.source=utmcsr&partnerUtm.medium=microwidget_links&partnerUtm.campaign=microwidget_osago_',
      {
        headers: { Authorization: 'Authorization' },
        timeout: 15000,
      },
    );
  });
});

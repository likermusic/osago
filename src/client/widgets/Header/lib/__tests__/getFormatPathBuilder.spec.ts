import { mockAxiosGet } from 'mocks/helpers';

import { DEFAULT_REGION } from '../../../../../server/constants/locations';
import { getFormatPathBuilder } from '../getFormatPathBuilder';

describe('WHEN "getFormatPathBuilder" is called', () => {
  it.each([
    ['test-with-slash/', 'test-with-slash/'],
    ['test/', 'test/'],
    ['test/alias1', 'test/'],
    ['test-with-slash/alias1/', 'test-with-slash/'],
  ])('AND url is %p AND new location is in indexed pages, MUST return new url', async (url, resultUrl) => {
    mockAxiosGet.mockResolvedValue({
      data: [DEFAULT_REGION.id],
    });
    expect(await getFormatPathBuilder(url, 'alias1')(DEFAULT_REGION)).toEqual(`${resultUrl}${DEFAULT_REGION.alias}/`);
  });

  it('AND new location is in indexed pages, MUST return default url', async () => {
    mockAxiosGet.mockResolvedValue({
      data: [],
    });
    expect(await getFormatPathBuilder('test', '')(DEFAULT_REGION)).toEqual(`test/`);
  });
});

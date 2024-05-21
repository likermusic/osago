import { DEFAULT_REGION } from '../../../constants/locations';
import { getLocationSeoParams } from '../../../utils/metadata';
import { getOtherPagesSeoParams } from '../getOtherPagesSeoParams';

describe('WHEN "getOtherPagesSeoParams" is called', () => {
  it('MUST return seo params from context', () => {
    expect(
      getOtherPagesSeoParams({
        path: 'test-url',
        req: {
          __SELECTED_LOCATION__: DEFAULT_REGION,
        },
      }),
    ).toEqual({
      url: 'test-url',
      location: getLocationSeoParams(DEFAULT_REGION),
    });
  });
});

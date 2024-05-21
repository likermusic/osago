import { generateQueryContext } from 'mocks/helpers/context';

import { BENEFIT_CODES } from '../constants';
import { setPromosMiddleware } from '../setPromosMiddleware';

describe('WHEN "setPromosMiddleware" is called', () => {
  const next = jest.fn();
  const context = generateQueryContext({});
  context.req = {};

  it(`AND url contains dodo, MUST set "${BENEFIT_CODES.dodo}" to benefitCode context property`, async () => {
    context.path = '/osago/dodo';

    await setPromosMiddleware(context, next);

    expect(context.req.__BENEFIT_CODE__).toEqual(BENEFIT_CODES.dodo);
    expect(next).toHaveBeenCalled();
  });
});

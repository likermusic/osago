import { generateQueryContext } from 'mocks/helpers/context';

import { APP_ROUTES } from '../../../../constants/routes';
import { restoreRedirectToAnketaPage } from '../restoreRedirectToAnketaPage';

jest.mock('constants/FEATURE_FLAGS', () => ({
  SHOULD_REDIRECT_RESTORATION_LINKS_TO_PAGE: true,
}));

describe('WHEN "restoreRedirectToAnketaPage" is called', () => {
  const next = jest.fn();
  const redirect = jest.fn();

  const query = {
    regNumberToken: 'regNumberToken',
  };

  const context = generateQueryContext(query);

  context.redirect = redirect;

  it('AND url has "regNumberToken", MUST redirect to anketa', async () => {
    context.query = {
      regNumberToken: query.regNumberToken,
    };

    await restoreRedirectToAnketaPage(context, next);

    expect(redirect).toHaveBeenCalledWith(`${APP_ROUTES.anketa}?regNumberToken=${query.regNumberToken}`, 301);
  });

  it('AND url does not contain any of restore params for proposition page, MUST continue without redirect', async () => {
    context.query = {};

    await restoreRedirectToAnketaPage(context, next);

    expect(redirect).not.toBeCalled();
    expect(next).toBeCalled();
  });
});

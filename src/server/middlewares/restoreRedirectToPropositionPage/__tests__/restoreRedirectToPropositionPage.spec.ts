import { generateQueryContext } from 'mocks/helpers/context';

import { APP_ROUTES } from '../../../../constants/routes';
import { restoreRedirectToPropositionPage } from '../restoreRedirectToPropositionPage';

jest.mock('constants/FEATURE_FLAGS', () => ({
  SHOULD_REDIRECT_RESTORATION_LINKS_TO_PAGE: true,
}));
describe('WHEN "restoreRedirectToPropositionPage" is called', () => {
  const next = jest.fn();
  const redirect = jest.fn();

  const query = {
    orderHash: 'orderHash',
    hash: 'hash',
    calculationHash: 'calculationHash',
    searchId: 'searchId',
  };

  const context = generateQueryContext(query);

  context.redirect = redirect;

  it('AND url contains "calculationHash", MUST redirect to proposition', async () => {
    context.query = {
      calculationHash: query.calculationHash,
    };
    await restoreRedirectToPropositionPage(context, next);

    expect(redirect).toHaveBeenCalledWith(`${APP_ROUTES.propositions}?calculationHash=${query.calculationHash}`, 301);
  });

  it('AND url contains "searchId", "hash", MUST redirect to proposition', async () => {
    context.query = {
      searchId: query.searchId,
      hash: query.hash,
    };
    await restoreRedirectToPropositionPage(context, next);

    expect(redirect).toHaveBeenCalledWith(
      `${APP_ROUTES.propositions}?searchId=${query.searchId}&hash=${query.hash}`,
      301,
    );
  });

  it('AND url does not contain any of restore params for proposition page, MUST continue without redirect', async () => {
    context.query = {};

    await restoreRedirectToPropositionPage(context, next);

    expect(redirect).not.toBeCalled();
    expect(next).toBeCalled();
  });
});

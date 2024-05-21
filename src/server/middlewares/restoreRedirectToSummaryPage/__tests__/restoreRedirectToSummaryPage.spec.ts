import { generateQueryContext } from 'mocks/helpers/context';

import { APP_ROUTES } from '../../../../constants/routes';
import { restoreRedirectToSummaryPage } from '../restoreRedirectToSummaryPage';

jest.mock('constants/FEATURE_FLAGS', () => ({
  SHOULD_REDIRECT_RESTORATION_LINKS_TO_PAGE: true,
}));

describe('WHEN "restoreRedirectToPropositionPage" is called', () => {
  const next = jest.fn();
  const redirect = jest.fn();

  const query = {
    orderHash: 'orderHash',
    prolongationHash: 'prolongationHash',
    hash: 'hash',
    calculationHash: 'calculationHash',
    searchId: 'searchId',
  };

  const context = generateQueryContext(query);

  context.redirect = redirect;

  describe('AND url orderOrProlongationHash "orderHash"', () => {
    it('MUST redirect to proposition', async () => {
      context.query = {
        orderHash: query.orderHash,
      };

      await restoreRedirectToSummaryPage(context, next);

      expect(redirect).toHaveBeenCalledWith(`${APP_ROUTES.summary}?orderHash=${query.orderHash}`, 301);
    });

    it('AND it is prolongation hash, MUST NOT redirect to proposition', async () => {
      context.query = {
        prolongationHash: query.prolongationHash,
      };

      await restoreRedirectToSummaryPage(context, next);

      expect(redirect).not.toHaveBeenCalled();
    });
  });

  it('AND url does not contain any of restore params for proposition page, MUST continue without redirect', async () => {
    context.query = {};

    await restoreRedirectToSummaryPage(context, next);

    expect(redirect).not.toBeCalled();
    expect(next).toBeCalled();
  });
});

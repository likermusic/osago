import { generateQueryContext } from 'mocks/helpers/context';

import { APP_ROUTES } from '../../../../constants/routes';
import { restoreRedirectForTriggerCommunication } from '../restoreRedirectForTriggerCommunication';

jest.mock('constants/FEATURE_FLAGS', () => ({
  SHOULD_REDIRECT_RESTORATION_LINKS_TO_PAGE: true,
}));

describe('WHEN "restoreRedirectForTriggerCommunication" is called', () => {
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

  it('AND url contains "calculationHash", MUST skip redirect', async () => {
    context.query = {
      calculationHash: query.calculationHash,
      searchId: query.searchId,
      hash: query.hash,
    };
    await restoreRedirectForTriggerCommunication(context, next);

    expect(redirect).not.toHaveBeenCalled();
  });

  it('AND url contains "orderHash", MUST skip redirect', async () => {
    context.query = {
      orderHash: query.orderHash,
      searchId: query.searchId,
      hash: query.hash,
    };
    await restoreRedirectForTriggerCommunication(context, next);

    expect(redirect).not.toHaveBeenCalled();
  });

  it('AND url does not contain "searchId", MUST skip redirect', async () => {
    context.query = {
      hash: query.hash,
    };
    await restoreRedirectForTriggerCommunication(context, next);

    expect(redirect).not.toHaveBeenCalled();
  });

  it('AND url does not contain "hash", MUST skip redirect', async () => {
    context.query = {
      searchId: query.searchId,
    };
    await restoreRedirectForTriggerCommunication(context, next);

    expect(redirect).not.toHaveBeenCalled();
  });

  it('AND url does not contain "calculationHash" OR "orderHash", MUST do redirect to anketa', async () => {
    context.query = {
      hash: query.hash,
      searchId: query.searchId,
    };
    await restoreRedirectForTriggerCommunication(context, next);

    expect(redirect).toHaveBeenCalledWith(
      `${APP_ROUTES.triggerCommunicationLoader}?hash=${query.hash}&searchId=${query.searchId}`,
      301,
    );
  });
});

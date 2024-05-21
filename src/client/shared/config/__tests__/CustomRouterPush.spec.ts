import { mockRouterPush } from 'mocks/helpers';

import { CustomRouter } from 'shared/config/router';

describe('WHEN "CustomRouter.push" is called', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        assign: jest.fn(),
      },
    });
  });

  describe('AND it is "landing" page', () => {
    it('AND query was provided as object, MUST use redirect with reload page', () => {
      CustomRouter.push('main', { query: { test: 'testparams' } });

      expect(window.location.assign).toHaveBeenCalledWith('/osago/?test=testparams');
    });

    it('AND query was provided as string, MUST use redirect with reload page', () => {
      CustomRouter.push('main', { query: 'test=testparams' });

      expect(window.location.assign).toHaveBeenCalledWith('/osago/?test=testparams');
    });

    it('AND query was not provided, MUST use redirect with reload page', () => {
      CustomRouter.push('main');

      expect(window.location.assign).toHaveBeenCalledWith('/osago/');
    });
  });

  it('AND it is not "landing" page, MUST use redirect without reload page', () => {
    CustomRouter.push('propositions', { query: { test: 'testparams' } });

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/osago/propositions/',
      query: { test: 'testparams' },
    });
  });
});

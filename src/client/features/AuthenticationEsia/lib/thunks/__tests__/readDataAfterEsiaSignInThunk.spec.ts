import type { IUser } from '@sravni/types/lib/auth';

import { mockAxiosGet, TEST_ERROR } from 'mocks/helpers';

import { FormStepId } from 'shared/config/formStepId';

import { addEsiaErrorAttempt, setEsiaStep, setUser } from 'entities/user';

import { readDataAfterEsiaSignInThunk } from '../readDataAfterEsiaSignInThunk';

class MockEsiaConnector {
  static onOkMock = jest.fn();
  static onErrorMock = jest.fn();
  static onCreated = jest.fn();
  constructor({ onSuccess, onError }: { onSuccess: () => void; onError: () => void }) {
    MockEsiaConnector.onOkMock.mockImplementation(onSuccess);
    MockEsiaConnector.onErrorMock.mockImplementation(onError);
    MockEsiaConnector.onCreated();
  }

  tryLogin = jest.fn();
}
jest.mock('@sravni/cosago-react-library/lib/components', () => ({
  ...jest.requireActual('@sravni/cosago-react-library/lib/components'),
  Widgets: {
    EsiaConnector: jest.fn().mockImplementation((props) => new MockEsiaConnector(props)),
  },
}));

jest.useFakeTimers();
describe('WHEN "readDataAfterEsiaSignInThunk" is called', () => {
  const dispatchMock = jest.fn();
  const state = (user: Record<string, unknown>) => (): AppStore => ({
    user,
  });

  beforeEach(() => {
    MockEsiaConnector.onCreated.mockReset();
  });

  it('AND user is logged in AND user is already has esia, MUST do nothing', () => {
    readDataAfterEsiaSignInThunk(FormStepId.Drivers)(
      dispatchMock,
      state({
        isLoggedIn: true,
        account: {
          isHasEsia: true,
        },
      }),
      undefined,
    );

    expect(MockEsiaConnector.onCreated).not.toHaveBeenCalled();
  });

  describe.each`
    userTitle               | loginState | esiaTitle                   | esiaState
    ${'user is not logged'} | ${false}   | ${'esia does not provided'} | ${false}
    ${'user is logged'}     | ${false}   | ${'esia does not provided'} | ${false}
  `('AND $userTitle AND $esiaTitle logged in', ({ loginState, esiaState }) => {
    const currentState = state({
      isLoggedIn: loginState,
      account: {
        isHasEsia: esiaState,
      },
    });

    it('MUST start esia authorization', () => {
      readDataAfterEsiaSignInThunk(FormStepId.Drivers)(dispatchMock, currentState, undefined);

      expect(MockEsiaConnector.onCreated).toHaveBeenCalled();
    });

    describe('AND authorization is success', () => {
      beforeEach(() => {
        mockAxiosGet.mockResolvedValue({
          data: {
            isHasEsia: true,
          },
        });
      });

      it('MUST update get user data from service', async () => {
        readDataAfterEsiaSignInThunk(FormStepId.Drivers)(dispatchMock, currentState, undefined);

        await MockEsiaConnector.onOkMock();

        expect(mockAxiosGet).toHaveBeenCalledWith('/account/');
        expect(dispatchMock).toHaveBeenCalledWith(
          setUser({
            isHasEsia: true,
          } as unknown as IUser),
        );
        expect(dispatchMock).toHaveBeenCalledWith(setEsiaStep(FormStepId.Drivers));
      });

      it('AND  user was not provided, MUST add attempt to store', async () => {
        mockAxiosGet.mockResolvedValue({
          data: null,
        });

        readDataAfterEsiaSignInThunk(FormStepId.Drivers)(dispatchMock, currentState, undefined);

        await MockEsiaConnector.onOkMock();

        expect(dispatchMock).toHaveBeenCalledWith(addEsiaErrorAttempt());
      });
    });

    it('AND  account service request was failure, MUST setEsiaError', async () => {
      mockAxiosGet.mockRejectedValue(TEST_ERROR);

      readDataAfterEsiaSignInThunk(FormStepId.Drivers)(dispatchMock, currentState, undefined);

      await MockEsiaConnector.onOkMock();

      expect(dispatchMock).toHaveBeenCalledWith(addEsiaErrorAttempt());
    });

    it('AND authorization is failure, MUST setEsiaError', () => {
      mockAxiosGet.mockResolvedValue({ data: null });

      readDataAfterEsiaSignInThunk(FormStepId.Drivers)(dispatchMock, currentState, undefined);

      MockEsiaConnector.onErrorMock();

      expect(dispatchMock).toHaveBeenCalledWith(addEsiaErrorAttempt());
    });
  });
});

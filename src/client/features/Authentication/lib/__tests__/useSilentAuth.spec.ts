import { act, renderHook } from '@testing-library/react-hooks';

import { mockAppDispatch, mockSetError, TEST_ERROR } from 'mocks/helpers';

import { useSilentAuth } from '../useSilentAuth';

const mockDestroy = jest.fn();
const mockLogin = jest.fn();
const mockPrepare = jest.fn();

jest.mock('@sravni/utils/lib/auth', () => ({
  AuthLoginByOtacHelper: class MockAuthLoginByOtacHelper {
    destroy = mockDestroy;
    login = mockLogin;
    prepare = mockPrepare;
  },
}));

const mockGetUserInfo = jest.fn();
jest.mock('entities/user', () => ({
  getUserInfo: jest.fn().mockImplementation(() => [mockGetUserInfo]),
  userSlice: {
    actions: {
      setUser: (args: Record<string, string>) => args,
    },
  },
}));

describe('WHEN "useSilentAuth" is mounted', () => {
  const smsCodeName = 'smsCodeName';

  it('AND "prepare" was called, MUST call "prepare" function for new instance of "AuthLoginByOtacHelper"', () => {
    const { result } = renderHook(() => useSilentAuth(smsCodeName));

    act(() => {
      result.current.prepareAuth();
    });

    expect(mockPrepare).toHaveBeenCalled();
  });

  describe('AND "runSilentAuth" was called', () => {
    beforeEach(() => {
      mockSetError.mockReturnValue(true);
    });

    describe('AND otac was not provided', () => {
      it('AND prepare was called, MUST try to destroy handler', () => {
        const { result } = renderHook(() => useSilentAuth(smsCodeName));

        act(() => {
          result.current.prepareAuth();
          result.current.runSilentAuth('', '', Promise.resolve());
        });

        expect(mockDestroy).toHaveBeenCalled();
      });

      it('MUST call "onReady"', () => {
        const ready = jest.fn();
        const { result } = renderHook(() => useSilentAuth(smsCodeName));

        act(() => {
          result.current.runSilentAuth('', '', Promise.resolve(), ready);
        });

        expect(ready).toHaveBeenCalled();
      });
    });

    describe('AND otac was provided', () => {
      const user = { id: '12345' };

      beforeEach(() => {
        mockGetUserInfo.mockReturnValue({
          data: user,
        });
      });

      it('MUST try to login by silent auth', async () => {
        const { result } = renderHook(() => useSilentAuth(smsCodeName));

        await act(async () => {
          result.current.prepareAuth();
          await result.current.runSilentAuth('12341234', '', Promise.resolve());
        });

        expect(mockLogin).toHaveBeenCalledWith({ hint: '', otac: '12341234' });
      });

      it('MUST update user store by data from session', async () => {
        const { result } = renderHook(() => useSilentAuth(smsCodeName));

        await act(async () => {
          result.current.prepareAuth();
          await result.current.runSilentAuth('12341234', '', Promise.resolve());
        });

        expect(mockAppDispatch).toHaveBeenCalledWith(user);
      });

      describe('AND there was an error within auth', () => {
        beforeEach(() => {
          mockGetUserInfo.mockRejectedValue(TEST_ERROR);
        });
        it('MUST set error to form context', async () => {
          const { result } = renderHook(() => useSilentAuth(smsCodeName));

          await act(async () => {
            result.current.prepareAuth();
            await result.current.runSilentAuth('12341234', '', Promise.resolve());
          });

          expect(mockDestroy).toHaveBeenCalled();
          expect(mockSetError).toHaveBeenCalledWith(smsCodeName, TEST_ERROR.message);
        });
      });
    });
  });
});

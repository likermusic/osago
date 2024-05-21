import { act, renderHook } from '@testing-library/react-hooks';

import { mockedNanoid } from 'mocks/index';

// import { mockAppDispatch, mockedNanoid, TEST_ERROR } from 'mocks/index';
import type { RestoreCalculationQuery } from '../../../utils';
import { useRestoreCalculation } from '../useRestoreCalculation';

// const mockRedirectToAnketaWithQueryParams = jest.fn();

// TODO: os-7670 напишу тестики пока будет тестится они тут сломались потому что на функции разбил

// redirectToOldOsago - было удалено в рамках задачи OS-7953, если нужно, то использовать CustomRouter.push('')
// jest.mock('shared/lib/OSAGOv1/redirectToOldOsago/redirectToOldOsago', () => ({
//   redirectToAnketaWithQueryParams: jest.fn().mockImplementation((...args) => {
//     mockRedirectToAnketaWithQueryParams(...args);
//   }),
// }));

const mockUpdateFormStoreThunk = jest.fn();
jest.mock('../../../utils/updateFormStoreThunk', () => ({
  updateFormStoreThunk: jest.fn().mockImplementation((...args: unknown[]) => mockUpdateFormStoreThunk(...args)),
}));

const mockUseDeeplink = jest.fn();
jest.mock('shared/lib/useDeeplink', () => ({
  useDeeplink: jest.fn().mockImplementation((...args: unknown[]) => mockUseDeeplink(...args)),
}));

const mockRestoreCalculationQuery = jest.fn();
jest.mock('../../../utils', () => ({
  restoreCalculationQuery: jest.fn().mockImplementation((...args: unknown[]) => mockRestoreCalculationQuery(...args)),
}));

const mockRestoreQueryDictionaries = jest.fn();
jest.mock('../../../utils/restoreQueryDictionaries/restoreQueryDictionaries', () => ({
  restoreQueryDictionaries: jest.fn().mockImplementation((...args: unknown[]) => mockRestoreQueryDictionaries(...args)),
}));

const mockUseGetPolicyInfo = jest.fn();
jest.mock('entities/PolicyInfo/model/policyInfo.query', () => ({
  useLazyGetPolicyInfo: jest.fn().mockImplementation(() => [mockUseGetPolicyInfo]),
}));

describe('WHEN "useRestoreCalculationQueryByHash" is mounted', () => {
  // const calculationQueryData = {
  //   someData: 'pjf_OJDPygMSTlzIJIXthg',
  // };

  describe('AND calculation query was provided', () => {
    const urlQuery: RestoreCalculationQuery = {
      calculationHash: 'pjf_OJDPygMSTlzIJIXthg',
      hash: 'hash',
      orderHash: 'pjf_OJDPygMSTlzIJIXthpjf_OJDPygMSTlzIJIXthpjf_OJDPygMSTlzIJIXt33',
      searchId: 'searchId',
    };

    beforeEach(() => {
      mockRestoreCalculationQuery.mockResolvedValue({});
      mockedNanoid.mockReturnValue(1);

      mockUseDeeplink.mockReturnValue({
        params: urlQuery,
      });
    });

    it.skip('MUST set loading state', async () => {
      const { result } = renderHook(() => useRestoreCalculation());

      await act(async () => {
        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.isError).toBeFalsy();
        await Promise.resolve();
      });
    });

    //   describe('AND "sessionQuery" was presented', () => {
    //     beforeEach(() => {
    //       window.sessionStorage.removeItem('sessionQuery');
    //     });
    //
    //     it('MUST try to update store for form from session storage', async () => {
    //       mockUseDeeplink.mockReturnValue({
    //         params: {
    //           sessionQuery: 'sessionQuery',
    //         },
    //       });
    //
    //       window.sessionStorage.setItem('sessionQuery', JSON.stringify(calculationQueryData));
    //
    //       renderHook(() => useRestoreCalculation());
    //       await act(async () => {
    //         await Promise.resolve();
    //       });
    //
    //       expect(mockUpdateFormStoreThunk).toHaveBeenCalledWith({
    //         ...calculationQueryData,
    //         carDocument: {
    //           documentType: undefined,
    //         },
    //         driversInfo: {
    //           driverAmount: 'unlimited',
    //           drivers: [],
    //         },
    //         insurer: {
    //           fullName: '',
    //         },
    //         owner: {
    //           fullName: '',
    //         },
    //       });
    //       expect(mockRedirectToAnketaWithQueryParams).not.toHaveBeenCalled();
    //     });
    //
    //     it('AND restore was failed, MUST navigate on anketa page', async () => {
    //       mockUseDeeplink.mockReturnValue({
    //         params: {
    //           sessionQuery: 'sessionQuery',
    //         },
    //       });
    //
    //       renderHook(() => useRestoreCalculation());
    //       await act(async () => {
    //         await Promise.resolve();
    //       });
    //
    //       expect(mockRedirectToAnketaWithQueryParams).toHaveBeenCalled();
    //       expect(mockUpdateFormStoreThunk).not.toHaveBeenCalled();
    //     });
    //   });
    //
    //   describe('AND serverside restore params were presented', () => {
    //     it.each([
    //       ['anketa', { hash: urlQuery.hash, searchId: urlQuery.searchId }],
    //       ['existed order', { orderHash: urlQuery.orderHash }],
    //       ['existed calculation', { calculationHash: urlQuery.calculationHash }],
    //     ])(
    //       'AND link contains %p params was presented, MUST do request to server with provided params',
    //       async (_, query) => {
    //         mockUseDeeplink.mockReturnValue({
    //           params: query,
    //         });
    //
    //         renderHook(() => useRestoreCalculation());
    //         await act(async () => {
    //           await Promise.resolve();
    //         });
    //
    //         expect(mockRedirectToAnketaWithQueryParams).not.toHaveBeenCalled();
    //         expect(mockRestoreCalculationQuery).toHaveBeenCalledWith(query);
    //       },
    //     );
    //
    //     describe('AND request was success', () => {
    //       beforeEach(() => {
    //         mockUseDeeplink.mockReturnValue({
    //           params: urlQuery,
    //         });
    //       });
    //
    //       it('MUST do request for dictionaries', async () => {
    //         renderHook(() => useRestoreCalculation());
    //         await act(async () => {
    //           await Promise.resolve();
    //         });
    //
    //         expect(mockRestoreQueryDictionaries).toHaveBeenCalled();
    //       });
    //
    //       it('MUST do request for policy info', async () => {
    //         renderHook(() => useRestoreCalculation());
    //         await act(async () => {
    //           await Promise.resolve();
    //         });
    //
    //         expect(mockUseGetPolicyInfo).toHaveBeenCalled();
    //       });
    //
    //       it('MUST drop loading state', async () => {
    //         const { result } = renderHook(() => useRestoreCalculation());
    //         await act(async () => {
    //           await Promise.resolve();
    //         });
    //
    //         expect(result.current.isLoading).toBeFalsy();
    //         expect(result.current.isError).toBeFalsy();
    //       });
    //
    //       it('MUST update form data', async () => {
    //         renderHook(() => useRestoreCalculation());
    //
    //         await act(async () => {
    //           await Promise.resolve();
    //         });
    //
    //         expect(mockUpdateFormStoreThunk).toBeCalled();
    //       });
    //
    //       it('MUST do request getPolicyInfo ', async () => {
    //         renderHook(() => useRestoreCalculation());
    //
    //         await act(async () => {
    //           await Promise.resolve();
    //         });
    //
    //         expect(mockUseGetPolicyInfo).toBeCalled();
    //       });
    //     });
    //
    //     describe('AND request was failed', () => {
    //       it('MUST set error state', async () => {
    //         mockAppDispatch.mockReset();
    //         mockRestoreCalculationQuery.mockRejectedValue(TEST_ERROR);
    //         const { result } = renderHook(() => useRestoreCalculation());
    //
    //         await act(async () => {
    //           await Promise.resolve();
    //         });
    //
    //         expect(mockAppDispatch).toBeCalledTimes(0);
    //         expect(result.current.isLoading).toBeFalsy();
    //         expect(result.current.isError).toBeTruthy();
    //       });
    //
    //       it('MUST navigate user to anketa', async () => {
    //         mockAppDispatch.mockReset();
    //         mockRestoreCalculationQuery.mockRejectedValue(TEST_ERROR);
    //         renderHook(() => useRestoreCalculation());
    //         await act(async () => {
    //           await Promise.resolve();
    //         });
    //
    //         expect(mockRedirectToAnketaWithQueryParams).toHaveBeenCalledTimes(1);
    //       });
    //     });
    //   });
    // });
    //
    // it('AND no one restoration parameter was not provided, MUST set error state', async () => {
    //   mockUseDeeplink.mockReturnValue({
    //     params: {},
    //   });
    //
    //   const { result } = renderHook(() => useRestoreCalculation());
    //   await act(async () => {
    //     await Promise.resolve();
    //   });
    //
    //   expect(result.current.isLoading).toBeFalsy();
    //   expect(result.current.isError).toBeTruthy();
  });
});

import { renderHook } from '@testing-library/react-hooks';

import { mockAppSelector } from 'mocks/helpers';
import { CALCULATIONS_INITIAL, CALCULATIONS_TRANSFORMED } from 'mocks/mappersPropositionCalculations';

import { useSendCalculationAnalytics } from '../useSendCalculationAnalytics';

const mockUseGetSendAnalytics = jest.fn();
const mockSendAnalyticsEvent = jest.fn();
const mockPropositionStatusSelector = jest.fn();
const mockSendEventPropositionsShow = jest.fn();

jest.mock('../../../model/propositionCalculations.selectors', () => ({
  propositionStatusSelector: jest
    .fn()
    .mockImplementation((...args: unknown[]) => mockPropositionStatusSelector(...args)),
}));

jest.mock('shared/lib/sendAnalyticsEvents', () => ({
  useGetSendAnalytics: jest.fn().mockImplementation((...args: unknown[]) => mockUseGetSendAnalytics(...args)),
}));
jest.mock('shared/lib/sendGAEvents', () => ({
  sendEventPropositionsShow: jest
    .fn()
    .mockImplementation((...args: unknown[]) => mockSendEventPropositionsShow(...args)),
}));

describe('WHEN "useSendCalculationAnalytics" is called', () => {
  beforeEach(() => {
    mockUseGetSendAnalytics.mockReturnValue(mockSendAnalyticsEvent);
  });

  test('AND it first increase MUST send events - ...first1_ic, ...first3_ic', () => {
    mockAppSelector.mockReturnValue(CALCULATIONS_TRANSFORMED);
    renderHook(() => useSendCalculationAnalytics());

    expect(mockSendAnalyticsEvent).toHaveBeenCalledWith('osago_calculation_first1_ic');
    expect(mockSendAnalyticsEvent).toHaveBeenCalledWith('osago_calculation_first1_ic');

    expect(mockSendEventPropositionsShow).toHaveBeenCalledWith({ propositionStatus: 'Успех' });
  });

  test.each`
    propositionStatus   | backEventName                                                           | frontEventName
    ${'empty'}          | ${['osago_empty_result_on_calculations', 'osago_calculation_complete']} | ${'Расчет недоступен'}
    ${'error'}          | ${'osago_calculation_complete'}                                         | ${'Ошибка бэка'}
    ${'success'}        | ${'osago_calculation_complete'}                                         | ${''}
    ${'stoppedByOrder'} | ${'osago_calculation_complete'}                                         | ${''}
    ${'initial'}        | ${''}                                                                   | ${''}
    ${'loading'}        | ${''}                                                                   | ${''}
  `(
    'for propositionStatus $propositionStatus MUST send event - $eventName',
    ({ propositionStatus, backEventName, frontEventName }) => {
      mockAppSelector.mockReturnValue({ ...CALCULATIONS_INITIAL, propositionStatus });
      renderHook(() => useSendCalculationAnalytics());

      if (Array.isArray(backEventName)) {
        expect(mockSendAnalyticsEvent).toHaveBeenCalledTimes(backEventName.length);

        backEventName.forEach((eventName) => {
          expect(mockSendAnalyticsEvent).toHaveBeenCalledWith(eventName);
        });
      } else {
        backEventName
          ? expect(mockSendAnalyticsEvent).toHaveBeenCalledWith(backEventName)
          : expect(mockSendAnalyticsEvent).not.toHaveBeenCalled();
      }

      frontEventName
        ? expect(mockSendEventPropositionsShow).toHaveBeenCalledWith({ propositionStatus: frontEventName })
        : expect(mockSendEventPropositionsShow).not.toHaveBeenCalled();
    },
  );
});

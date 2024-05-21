import type { IPollingAbs, TErrorAction, TSuccessAction } from 'shared/lib/Polling/types';

export class MockPollingClass implements IPollingAbs<{}> {
  static onStop = jest.fn();
  static onStart = jest.fn();
  static onSuccess = jest.fn();
  static onError = jest.fn();

  startPolling(params: Record<string, unknown>): void {
    MockPollingClass.onStart(params);
  }

  stopPolling(): void {
    MockPollingClass.onStop();
  }

  setOnError(onError: TErrorAction): void {
    MockPollingClass.onError.mockImplementation(onError);
  }

  setOnSuccess(onSuccess: TSuccessAction<{}>): void {
    MockPollingClass.onSuccess.mockImplementation(onSuccess);
  }
}

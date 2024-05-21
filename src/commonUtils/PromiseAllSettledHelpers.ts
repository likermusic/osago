export const isPromiseSettledFulfilled = <Data>(
  promise: PromiseSettledResult<Data>,
): promise is PromiseFulfilledResult<Data> => promise.status === 'fulfilled';

export const isPromiseSettledRejected = <Data>(promise: PromiseSettledResult<Data>): promise is PromiseRejectedResult =>
  promise.status === 'rejected';

export const mapPromiseSettledFulfilledValues = <Data, RejectedData>(
  promise: PromiseSettledResult<Data>,
  rejectedValue: RejectedData,
): Data | RejectedData => (isPromiseSettledFulfilled(promise) ? promise.value : rejectedValue);

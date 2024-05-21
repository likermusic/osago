export const RTK_ACTION_TYPE_FULFILLED = 'api/executeQuery/fulfilled';
export const RTK_ACTION_TYPE_REJECTED = 'api/executeQuery/rejected';

export const generateFullFilledMock = (name: string) => ({
  queries: {
    endpoints: {
      [name]: {
        matchFulfilled: () => true,
      },
    },
  },
});

export function generateQueryContext<Data>(query: Data) {
  return {
    request: {
      query,
    },
  } as unknown as App.ExtendedContext;
}

export function generateBodyContext<Data>(body: Data) {
  return {
    cookies: {
      get: jest.fn(),
    },
    request: {
      body,
    },
  } as unknown as App.ExtendedContext;
}

import { objectToQuery } from '../objectToQuery';

describe('WHEN "objectToQuery" is called', () => {
  it.each([[null], [{}], [{ code: undefined }]])('AND argument is %p params, MUST return empty string', (query) => {
    expect(objectToQuery(query as Record<string, string>)).toBe('');
  });

  it('AND argument is valid params, MUST return ', () => {
    expect(
      objectToQuery({
        test: 'test-data',
        test1: 'test-data1',
      }),
    ).toEqual('test=test-data&test1=test-data1');
  });
});

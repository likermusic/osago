import { getKbmFieldData } from '../getKbmFieldData';

describe('WHEN getKbmFieldData is called', () => {
  const mockKbmData = {
    value: 5,
  };

  it.each([
    [mockKbmData, false, false, true, { value: mockKbmData.value, status: 'success' }],
    [undefined, false, false, false, { value: null, status: 'noData' }],
    [mockKbmData, true, false, true, { value: null, status: 'networkError' }],
    [mockKbmData, false, true, true, { value: null, status: 'loading' }],
    [{ value: 0 }, false, false, true, { value: null, status: 'notFound' }],
  ])(
    'AND kbmData is %p AND isError = %p AND isLoading = %p AND isValid = %p, MUST return %p',
    // eslint-disable-next-line max-params
    (kbmData, isError, isLoading, isValid, result) => {
      expect(getKbmFieldData(kbmData, isError, isLoading, isValid)).toEqual(result);
    },
  );
});

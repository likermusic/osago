import { removeEmptyFields } from '../removeEmptyFields';

describe('WHEN "removeEmptyFields" is called', () => {
  it('MUST remove empty fields', () => {
    const obj = {
      a: undefined,
      b: {
        c: undefined,
      },
      d: [],
      e: [{ f: undefined }],
      g: '',
      i: 'Invalid Date',
      k: 'qwe',
      l: null,
      m: NaN,
    };

    expect(removeEmptyFields(obj)).toStrictEqual({ d: [], e: [], k: 'qwe' });
  });
});

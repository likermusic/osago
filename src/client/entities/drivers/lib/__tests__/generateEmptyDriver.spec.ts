import { mockedNanoid } from '../../../../../__mocks__';
import { generateEmptyDriver } from '../generateEmptyDriver';

describe('WHEN "generateEmptyDriver" is called', () => {
  const testId = 'test';

  mockedNanoid.mockReturnValue(testId);

  it('MUST return new empty driver option', () => {
    expect(generateEmptyDriver()).toEqual({
      [testId]: {
        data: null,
        isFullFilled: false,
      },
    });
  });
});

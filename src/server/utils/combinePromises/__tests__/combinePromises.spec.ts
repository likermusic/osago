import { TEST_ERROR } from '../../../../__mocks__';
import { combinePromises } from '../index';

describe('WHEN "combinePromises" is called', () => {
  it.each([[undefined], [null], ['']])(
    'AND "promises were not provided, MUST return empty object"',
    async (promises) => {
      // @ts-ignore
      expect(await combinePromises(promises)).toEqual({});
    },
  );

  describe('AND "promises were provided', () => {
    const promises = {
      data: Promise.resolve(true),
      data1: Promise.resolve(false),
    };

    it('AND all promises success, MUST return all promises results', async () => {
      expect(await combinePromises(promises)).toEqual({
        data: true,
        data1: false,
      });
    });

    it('AND promises successes partially, MUST return all promises results with "null" for failed', async () => {
      expect(
        await combinePromises({
          ...promises,
          failedData: Promise.reject(TEST_ERROR),
        }),
      ).toEqual({
        data: true,
        data1: false,
        failedData: null,
      });
    });
  });
});

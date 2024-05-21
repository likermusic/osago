import { leaveOnlyUniqueValues } from 'shared/lib/leaveOnlyUniqueValues';

describe('WHEN "leaveOnlyUniqueValues" is called', () => {
  test.each`
    array                                | result
    ${[]}                                | ${[]}
    ${undefined}                         | ${[]}
    ${null}                              | ${[]}
    ${[1, 2, 3, 4]}                      | ${[1, 2, 3, 4]}
    ${[1, 2, 3, 4, 1, 2, 3]}             | ${[1, 2, 3, 4]}
    ${['1', '2', '3', '4', '3', '4', 1]} | ${['1', '2', '3', '4', 1]}
  `('AND value is - $array MUST return $result', ({ array, result }) => {
    expect(leaveOnlyUniqueValues(array)).toEqual(result);
  });
});

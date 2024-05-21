import { replaceValueInObject } from '../replaceValueInObject';

describe('WHEN "replaceValueInObject" is called', () => {
  it('AND nothing to replace MUST not replace value in object', () => {
    const obj = { brand: 'BMW', model: 'X6' };

    expect(replaceValueInObject(obj, 'brand', 'ВАЗ', 'LADA (ВАЗ)')).toStrictEqual(obj);
  });

  it('MUST replace value in object', () => {
    const obj = { brand: 'ВАЗ', model: 'Granta' };
    const resultObj = { brand: 'LADA (ВАЗ)', model: 'Granta' };

    expect(replaceValueInObject(obj, 'brand', 'ВАЗ', 'LADA (ВАЗ)')).toStrictEqual(resultObj);
  });
});

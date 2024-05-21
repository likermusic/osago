import { getAppType } from '../getAppType';

describe('WHEN "getAppType" is called', () => {
  it.each([
    ['/osago', undefined, 'sravni.ru'],
    ['/osago/wl', undefined, 'wl'],
    ['/osago/success', '1234', 'wl'],
  ])('AND provided url is %p AND parentId is %p, MUST return %p', (path, parentId, result) => {
    expect(getAppType(path, parentId)).toBe(result);
  });
});

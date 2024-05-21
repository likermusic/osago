import { appendSlash } from '../appendSlash';

describe('server/utils/appendSlash', () => {
  it('should append slash to the end of the string', () => {
    expect(appendSlash('/test')).toBe('/test/');
  });
});

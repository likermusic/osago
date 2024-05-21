import { convertLocationToMap } from '../convertLocationToMap';

describe('WHEN "convertLocationToMap" is called', () => {
  const location = {
    id: 1,
    name: 'name',
  } as ILocation;

  it('AND companies list is empty, MUST return empty object', () => {
    expect(convertLocationToMap([])).toEqual({});
  });

  it('AND companies list is not empty, MUST return object with company id as a key', () => {
    expect(convertLocationToMap([location])).toEqual({
      [location.id]: location,
    });
  });
});

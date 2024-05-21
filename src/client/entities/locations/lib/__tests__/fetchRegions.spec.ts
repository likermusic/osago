import { fetchRegions } from 'entities/locations/lib';

import { mockAxiosGet } from '../../../../../__mocks__';

describe('WHEN "fetchRegions" is called', () => {
  const locations = [{ id: 'location-id' }];

  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({ data: locations });
  });

  describe('AND data is presented in localStorage', () => {
    localStorage.setItem('centers', JSON.stringify(locations));

    it('MUST return data from cache', async () => {
      expect(await fetchRegions()).toEqual(locations);
    });

    it('MUST NOT do request data from bff', async () => {
      await fetchRegions();

      expect(mockAxiosGet).not.toHaveBeenCalled();
    });
  });
});

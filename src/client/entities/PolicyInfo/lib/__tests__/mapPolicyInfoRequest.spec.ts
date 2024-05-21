import type { IPolicyInfoRequest } from '../mapPolicyInfoRequest';
import { mapPolicyInfoRequest } from '../mapPolicyInfoRequest';

describe('WHEN "mapPolicyInfoRequest" is called', () => {
  it.each([undefined, null, [[null]], [[undefined]], [['']], [[{}]], {}, []])(
    'AND data was not correct as %p, MUST return empty object',
    (drivers) => {
      expect(mapPolicyInfoRequest(drivers as unknown as IPolicyInfoRequest)).toEqual({});
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    expect(
      mapPolicyInfoRequest({
        carNumber: 'А 333 АА 32',
        vin: 'XXX123',
        ownerBirthDate: '21.02.2001',
        ownerFio: { label: 'А Б В', value: 'А Б В' },
      }),
    ).toEqual({
      carNumber: 'А333АА32',
      vin: 'XXX123',
      ownerBirthDate: '2001-02-21',
      ownerFio: {
        lastName: 'А',
        firstName: 'Б',
        middleName: 'В',
      },
    });
  });

  it('AND data was not fully provided, MUST return with nullable data', () => {
    expect(
      mapPolicyInfoRequest({
        vin: 'XXX123',
      }),
    ).toEqual({
      vin: 'XXX123',
    });
  });
});

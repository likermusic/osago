import type { Cross } from 'commonTypes/api/cross';

import { mapCrossCalculations } from '../mapCrossCalculations';

const CROSS_CALCULATIONS_RESULT = {
  status: 'none',
  hash: '',
  products: [
    {
      id: '2222',
      name: '222',
      description: '222',
    },
  ],
  propositions: [
    {
      hash: '123',
      price: 123,
      limits: [{ title: '11', limit: 0 }],
      companyId: 123,
      companyName: '',
      icon: '',
      type: 'crossKasko' as const,
      insuranceEntity: '',
      startDate: '',
      product: {
        id: '',
        name: '',
        description: '',
        properties: [
          {
            id: '',
            name: '',
            description: '',
            number: 0,
            icon: '',
            file: '',
          },
        ],
        recommendation: '',
        risks: [
          {
            id: '',
            name: '',
            description: '',
            number: 0,
            icon: '',
            file: '',
          },
        ],
        actions: [
          {
            id: '',
            name: '',
            description: '',
            number: 0,
            icon: '',
            file: '',
          },
        ],
        restrictions: [
          {
            id: '',
            name: '',
            description: '',
            number: 0,
            icon: '',
            file: '',
          },
        ],
        documents: [
          {
            id: '',
            name: '',
            description: '',
            number: 0,
            icon: '',
            file: '',
          },
        ],
      },
    },
  ],
};

const CROSS_CALCULATIONS = {
  status: 'none' as const,
  hash: '',
  products: [
    {
      id: '2222',
      name: '222',
      description: '222',
    },
  ],
  propositions: [
    {
      hash: '123',
      price: 123,
      limits: [{ title: '11', limit: 0 }],
      companyId: 123,
      companyName: '',
      icon: '',
      type: 'crossKasko' as const,
      insuranceEntity: '',
      startDate: '',
      product: {
        id: '',
        name: '',
        description: '',
        properties: [
          {
            id: '',
            name: '',
            description: '',
            number: 0,
            icon: '',
            file: '',
          },
        ],
        recommendation: '',
        risks: [
          {
            id: '',
            name: '',
            description: '',
            number: 0,
            icon: '',
            file: '',
          },
        ],
        actions: [
          {
            id: '',
            name: '',
            description: '',
            number: 0,
            icon: '',
            file: '',
          },
        ],
        restrictions: [
          {
            id: '',
            name: '',
            description: '',
            number: 0,
            icon: '',
            file: '',
          },
        ],
        documents: [
          {
            id: '',
            name: '',
            description: '',
            number: 0,
            icon: '',
            file: '',
          },
        ],
      },
    },
  ],
};

describe('WHEN "mapCrossCalculations" is called', () => {
  it.each([undefined, null, {}, []])(
    'AND data was not correct as %p, MUST return empty object with error',
    (propositions) => {
      expect(mapCrossCalculations(propositions as Cross.GetCrossCalculations)).toEqual({
        status: 'error',
        hash: undefined,
        products: [],
        propositions: [],
      });
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapCrossCalculations(CROSS_CALCULATIONS)).toEqual(CROSS_CALCULATIONS_RESULT);
  });
});

import { mapPropositionStatus } from '../mapPropositionStatus';

describe('WHEN "mapPropositionStatus" is called', () => {
  it.each([
    {
      propositionsLength: 0,
      orderInfo: null,
      isCompleted: true,
      result: 'empty',
    },
    {
      propositionsLength: 1,
      orderInfo: null,
      isCompleted: true,
      result: 'success',
    },
    {
      propositionsLength: 0,
      orderInfo: {},
      isCompleted: true,
      result: 'success',
    },
    {
      propositionsLength: 10,
      orderInfo: {},
      isCompleted: true,
      result: 'success',
    },
    {
      propositionsLength: 10,
      orderInfo: {},
      isCompleted: false,
      result: 'loading',
    },
    {
      propositionsLength: 0,
      orderInfo: null,
      isCompleted: false,
      result: 'loading',
    },
  ])(
    'MUST map propositionsLength:$propositionsLength, orderInfo:$orderInfo, isCompleted:$isCompleted into "$result"',
    ({ propositionsLength, orderInfo, isCompleted, result }) => {
      expect(mapPropositionStatus(propositionsLength, !!orderInfo, isCompleted)).toBe(result);
    },
  );
});

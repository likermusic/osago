import { parseUrlQuery } from '../parseUrlQuery';

describe('WHEN "parseUrlQuery" is called', () => {
  it('AND query is empty, MUST return default object', () => {
    expect(parseUrlQuery(null)).toEqual({
      calculationHash: '',
      orderHash: '',
      orderOrProlongationHash: '',
      searchId: '',
      hash: '',
      benefitCode: '',
      sessionQuery: '',
      autoNumber: '',
      regNumberToken: '',
      isOrderApproved: false,
      prolongationHash: '',
      platenumber: undefined,
      raffleModalType: '',
    });
  });

  it('AND query contains ot only required properties, MUST return only properties from return interface', () => {
    expect(
      parseUrlQuery({
        calculationHash: 'calculationHash',
        orderHash: 'orderHash',
        searchId: 'searchId',
        hash: 'hash',
        test: 'test',
        test1: 'test1',
        benefitCode: 'benefitCode',
        sessionQuery: 'sessionQuery',
        regNumberToken: 'regNumberToken',
        isOrderApproved: 'true',
        autoNumber: 'autoNumber',
      }),
    ).toEqual({
      calculationHash: 'calculationHash',
      orderHash: 'orderHash',
      orderOrProlongationHash: 'orderHash',
      searchId: 'searchId',
      hash: 'hash',
      benefitCode: 'benefitCode',
      autoNumber: 'autoNumber',
      sessionQuery: 'sessionQuery',
      regNumberToken: 'regNumberToken',
      isOrderApproved: true,
      prolongationHash: '',
      platenumber: undefined,
      raffleModalType: '',
    });
  });
});

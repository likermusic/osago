import { handleHashes } from '../handleHashes';

describe('WHEN "handleHashes.decode" is called', () => {
  it('AND type is "calculation", MUST decode calculation hash', () => {
    expect(handleHashes.decode('calculation-hash')).toEqual({
      hash: 'hash',
      type: 'calculation',
    });
  });

  it('AND type is "prolongation", MUST decode prolongation hash', () => {
    expect(handleHashes.decode('prolongation-hash')).toEqual({
      hash: 'hash',
      type: 'prolongation',
    });
  });

  it('AND type is "unknown", MUST throw error', () => {
    expect(() => handleHashes.decode('wrong-id')).toThrow();
  });
});

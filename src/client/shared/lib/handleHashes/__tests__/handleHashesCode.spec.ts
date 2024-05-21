import { handleHashes } from '../handleHashes';

describe('WHEN "handleHashes.code" is called', () => {
  it('AND type is "calculation", MUST encode calculation hash', () => {
    expect(handleHashes.code('hash', 'calculation')).toBe('calculation-hash');
  });

  it('AND type is "prolongation", MUST encode prolongation hash', () => {
    expect(handleHashes.code('hash', 'prolongation')).toBe('prolongation-hash');
  });
});

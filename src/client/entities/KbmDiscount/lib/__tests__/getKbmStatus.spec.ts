import { getKbmStatus } from '../getKbmStatus';
import { KbmStatuses } from '../KbmDiscount.contants';

describe('WHEN getKbmStatus is called', () => {
  it.each([
    [undefined, KbmStatuses.NotFound],
    [0.46, KbmStatuses.IsMaxDiscount],
    [0.99, KbmStatuses.HasDiscount],
    [1, KbmStatuses.IsWithoutDiscount],
    [1.17, KbmStatuses.IsDefaultKbm],
    [1.46, KbmStatuses.HasAccidents],
  ])('AND provided kbm is equal (%p), MUST return (%p) status', (kbm, result) => {
    expect(getKbmStatus(kbm)).toEqual(result);
  });
});

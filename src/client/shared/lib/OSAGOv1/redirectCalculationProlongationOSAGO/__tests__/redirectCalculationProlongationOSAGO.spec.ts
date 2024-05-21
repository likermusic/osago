import { redirectCalculationProlongationOSAGO } from 'shared/lib/OSAGOv1';

const mockGenerateOldOsagoUrl = jest.fn();
jest.mock('shared/lib/OSAGOv1/generateOldOsagoUrl/generateOldOsagoUrl', () => ({
  generateOldOsagoUrl: jest.fn().mockImplementation((...args: unknown[]) => mockGenerateOldOsagoUrl(...args)),
}));

describe('WHEN "redirectCalculationProlongationOSAGO" is called', () => {
  const hash = '1234';

  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: '',
    },
  });

  it('AND it is "calculation", MUST do redirect to old osago "calculation" page', () => {
    redirectCalculationProlongationOSAGO(hash, false);

    expect(mockGenerateOldOsagoUrl).toHaveBeenCalledWith(`?isRepRedirect=true&calculationHash=${hash}`);
  });

  it('AND it is "prolongation", MUST do redirect to old osago "prolongation" page', () => {
    redirectCalculationProlongationOSAGO(hash, true);

    expect(mockGenerateOldOsagoUrl).toHaveBeenCalledWith(`?isRepRedirect=true&prolongationHash=${hash}`);
  });
});

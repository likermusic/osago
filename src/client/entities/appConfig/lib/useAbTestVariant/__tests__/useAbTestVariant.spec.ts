import { renderHook } from '@testing-library/react-hooks';

import { useAbTestVariant } from '../useAbTestVariant';

const MOCK: Record<string, string> = { TEST_MOCK_VARIANT_ID: '1' };

jest.mock('@sravni/react-utils', () => ({
  useAbTestingSdk: () => ({
    getExperimentVariant: (testId: string) => MOCK[testId],
  }),
}));

describe('WHEN "useAbTestVariant" is called', () => {
  it('MUST return current variant for started experiment', () => {
    const { result } = renderHook(() => useAbTestVariant('TEST_MOCK_VARIANT_ID'));

    expect(result.current).toEqual('1');
  });
});

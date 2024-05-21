import { useAbTestingSdk } from '@sravni/react-utils';

import { unsafeCoerce } from 'shared/lib/unsafeCoerce';

import type { TExperimentLabel } from '../../config';

export function useAbTestVariant<T>(experimentName: TExperimentLabel): T {
  const abTestingSdk = useAbTestingSdk();

  return unsafeCoerce<Nullable<string | number | boolean>, T>(abTestingSdk.getExperimentVariant(experimentName));
}

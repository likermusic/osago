import { isPhoneEqualMaskedPhone } from 'shared/lib/fields';

import { normalizedProlongationInfoSelector } from 'entities/prolongation';
import { accountSelector } from 'entities/user';

export const navigateWithProlongationThunk =
  (
    redirectAnketa: () => void,
    redirectCalculation: (orderHash: string) => void,
    startPreviousCalculations: () => Promise<Nullable<string>>,
  ): ThunkResult<void> =>
  async (_, getState) => {
    const prolongation = normalizedProlongationInfoSelector(getState());
    const user = accountSelector(getState());

    if (!user || !prolongation) {
      return null;
    }

    if (prolongation?.orderHash) {
      return redirectCalculation(prolongation?.orderHash);
    }

    if (isPhoneEqualMaskedPhone(user?.phone_number, prolongation?.maskedPhone)) {
      try {
        const orderHash = await startPreviousCalculations();
        if (orderHash) {
          return redirectCalculation(orderHash);
        }
      } catch (e) {
        return redirectAnketa();
      }
    }

    return redirectAnketa();
  };

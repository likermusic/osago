import { getPersonFullName } from 'shared/lib/getPersonFullName/getPersonFullName';
import { mapCalculationQueryToFormUser } from 'shared/lib/mapCalculationQueryToFormUser';
import type { TQuerySupportedForMapping } from 'shared/types/TQuerySupportedForMapping';

import type { OwnerCommonFields, TPolicyHolder } from 'entities/owner';
import { PolicyHolderType } from 'entities/owner';

export const mapCalculationQueryToFormOwner = (query: TQuerySupportedForMapping): OwnerCommonFields => {
  const { owner, insurer, driversInfo } = query || {};

  const ownerName = owner ? getPersonFullName(owner) : '';
  const insurerName = insurer ? getPersonFullName(insurer) : '';
  let policyHolderType: TPolicyHolder = PolicyHolderType.Default;

  if (ownerName && insurerName && ownerName === insurerName) {
    policyHolderType = PolicyHolderType.Owner;
  } else if (driversInfo?.drivers) {
    const driverIndex = driversInfo?.drivers?.findIndex((driver) => driver.fullName === insurer?.fullName);

    if (driverIndex > -1) {
      policyHolderType = driverIndex.toString();
    }
  }

  return {
    policyHolder: policyHolderType,
    ...mapCalculationQueryToFormUser(owner ?? null),
  };
};

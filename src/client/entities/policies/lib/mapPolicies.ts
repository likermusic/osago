import type { BadgeProps } from '@sravni/react-design-system/dist/types/components/Badge';
import { isDefined } from '@sravni/react-utils';
import dayjs from 'dayjs';

import type { PreviousCalculation } from 'commonTypes/api/previousCalculations';
import { formatDate } from 'commonUtils/formatters';
import { getMobileLogoLinkFromCompanyId } from 'commonUtils/getLogoLinkFromCompanyId';

import { getVehicleTypeFromCategory } from 'shared/lib/getVehicleTypeFromCategory';
import { handleHashes } from 'shared/lib/handleHashes';
import { pluralizeDrivers } from 'shared/lib/pluralize';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';
import { NO_VEHICLE_CATEGORY_IN_LAST_USER_ORDERS } from 'shared/lib/validations/Errors.texts';

import { comparePolicyEndDates } from 'entities/policies/lib/comparePolicyEndDates';

import type { StatePolicies, TPolicyDate } from '../types';

import { preparePolicyDate } from './preparePolicyDate';

const generateDateBadge = (date: Nullable<TPolicyDate>): BadgeProps | undefined =>
  date
    ? {
        color: date.status === 'positive' ? 'orange' : 'red',
        variant: 'primary',
        text: date.description,
      }
    : undefined;

const generateDriversBadge = (count: number): BadgeProps => ({
  color: 'white',
  variant: 'primary',
  text: `${count} ${pluralizeDrivers(count)}`,
});
export const mapPolicies = (policies: PreviousCalculation.GetProlongationPolicies): StatePolicies => {
  const today = dayjs().startOf('date');

  if (!policies?.result)
    return {
      result: [],
    };

  return {
    result: policies.result
      .sort((a, b) =>
        a.policyEndDate && b.policyEndDate
          ? comparePolicyEndDates(today)(
              formatDate.toObjectFromServer(a.policyEndDate),
              formatDate.toObjectFromServer(b.policyEndDate),
            )
          : 0,
      )
      .map((policy) => {
        if (!policy.hash || !policy.companyId || !policy.companyName) {
          return undefined;
        }

        if (policy.vehicleCategory === undefined) {
          sendSentryClientErrorOnce(true, NO_VEHICLE_CATEGORY_IN_LAST_USER_ORDERS, {
            level: 'log',
            req: JSON.stringify(policy),
          });
        }

        return {
          orderHash: handleHashes.code(policy.hash, 'prolongation'),
          AvatarIcon: getMobileLogoLinkFromCompanyId(policy.companyId),
          badges: [
            generateDateBadge(preparePolicyDate(policy.policyEndDate)),
            generateDriversBadge(policy?.drivers?.length ?? 0),
          ].filter(isDefined),
          title: policy.companyName,
          subtitle: `${policy.brandName} ${policy.modelName}`,
          regNumber: policy.regNumber ?? null,
          vehicleType: getVehicleTypeFromCategory(policy.vehicleCategory),
        } as const;
      })
      .filter(isDefined),
  };
};

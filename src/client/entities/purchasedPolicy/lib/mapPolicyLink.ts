import type { Order } from 'commonTypes/api/orderInfo';

import { isValueExist } from 'shared/lib/validations/isValueExist';

import type { PolicyLink } from '../types';

export const mapPolicyLink = (data: Order.PostPolicyLink): PolicyLink => ({
  policyLink: isValueExist(data?.policyLink, null),
  policyNumber: isValueExist(data?.policyNumber, ''),
  archiveLink: isValueExist(data?.archiveLink, null),
});

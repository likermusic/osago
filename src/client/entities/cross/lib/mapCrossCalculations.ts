import type { Cross } from 'commonTypes/api/cross';

import { formatExistValue } from 'shared/lib/validations/formatExistValue';
import { isValueExist } from 'shared/lib/validations/isValueExist';

import type { ICrossCalculationsResult } from '../types';

import { mapPropositions } from './mapPropositions';

export const mapCrossCalculations = (response: Cross.GetCrossCalculations): ICrossCalculationsResult => {
  if (!response) {
    return { status: 'error', hash: undefined, products: [], propositions: [] };
  }

  return {
    status: isValueExist(response.status, 'error'),
    hash: isValueExist(response.hash, undefined),
    products: formatExistValue(
      response.products,
      (products) =>
        products.map((product) => ({
          id: isValueExist(product.id, ''),
          name: isValueExist(product.name, ''),
          description: isValueExist(product.description, ''),
        })),
      [],
    ),
    propositions: formatExistValue(response.propositions, mapPropositions, []),
  };
};

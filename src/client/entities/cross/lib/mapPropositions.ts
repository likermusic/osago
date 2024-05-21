import type { Cross } from 'commonTypes/api/cross';

import { formatExistValue } from 'shared/lib/validations/formatExistValue';
import { isValueExist } from 'shared/lib/validations/isValueExist';

import type { ICrossCalculationsProposition } from '../types';

const mapProperties = (data: Cross.GetCrossCalculationsPropositionsPropertiesEnriched) =>
  data?.map((property) => ({
    id: isValueExist(property.id, ''),
    name: isValueExist(property.name, ''),
    description: isValueExist(property.description, ''),
    number: isValueExist(property.number, 0),
    icon: isValueExist(property.icon, ''),
    file: isValueExist(property.file, ''),
  }));

export const mapPropositions = (
  propositions: Cross.GetCrossCalculationsPropositions,
): ICrossCalculationsProposition[] =>
  propositions.map((proposition) => ({
    hash: isValueExist(proposition.hash, ''),
    price: isValueExist(proposition.price, 0),
    limits: formatExistValue(
      proposition.limits,
      (limits) =>
        limits.map((limit) => ({
          title: isValueExist(limit.title, ''),
          limit: isValueExist(limit.limit, 0),
        })),
      [],
    ),
    companyId: isValueExist(proposition.companyId, 0),
    companyName: isValueExist(proposition.companyName, ''),
    icon: isValueExist(proposition.icon, ''),
    type: isValueExist(proposition.type, ''),
    insuranceEntity: isValueExist(proposition.insuranceEntity, ''),
    startDate: isValueExist(proposition.startDate, ''),
    product: {
      id: isValueExist(proposition.product?.id, ''),
      name: isValueExist(proposition.product?.name, ''),
      description: isValueExist(proposition.product?.description, ''),
      properties: formatExistValue(proposition.product?.properties, mapProperties, []),
      recommendation: isValueExist(proposition.product?.recommendation, ''),
      risks: formatExistValue(proposition.product?.risks, mapProperties, []),
      actions: formatExistValue(proposition.product?.actions, mapProperties, []),
      restrictions: formatExistValue(proposition.product?.restrictions, mapProperties, []),
      documents: formatExistValue(proposition.product?.documents, mapProperties, []),
    },
  }));

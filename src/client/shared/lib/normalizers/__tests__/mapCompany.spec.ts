import { PROPOSITIONS_CORRECT_DATA, PROPOSITIONS_CORRECT_DATA_TRANSFORMED } from 'mocks/propositionsData';

import type { TNonNullableCalculationPropositionCompany } from 'shared/types';

import { mapCompany, mapFullCompany } from '../mapCompany';

const COMPANY = PROPOSITIONS_CORRECT_DATA[0].company;
const COMPANY_TRANSFORMED = PROPOSITIONS_CORRECT_DATA_TRANSFORMED[0].company;

const COMPANY_TRANSFORMED_NULLABLE = {
  averageRating: undefined,
  companyId: undefined,
  companyName: undefined,
  logoLink: '//f.sravni.ru/logotypes/ic/40x40/logo_undefined.svg',
};

describe('WHEN "mapFullCompany" is called', () => {
  it.each([undefined, null, {}])('AND data was not correct as %p, MUST return nullable object', (company) => {
    expect(mapFullCompany(company as unknown as TNonNullableCalculationPropositionCompany)).toEqual(
      COMPANY_TRANSFORMED_NULLABLE,
    );
  });

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapFullCompany(COMPANY as unknown as TNonNullableCalculationPropositionCompany)).toEqual(
      COMPANY_TRANSFORMED,
    );
  });
});

describe('WHEN "mapCompany" is called', () => {
  it.each([undefined, null, {}])('AND data was not correct as %p, MUST return nullable object', (company) => {
    expect(mapCompany(company as unknown as TNonNullableCalculationPropositionCompany)).toEqual(null);
  });

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapCompany(COMPANY as unknown as TNonNullableCalculationPropositionCompany)).toEqual({
      ...COMPANY_TRANSFORMED,
      averageRating: undefined,
    });
  });
});

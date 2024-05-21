import { renderHook } from '@testing-library/react-hooks';

import { mockWatch } from 'mocks/helpers';

import { useCurrentFields } from '../useCurrentFields';

const FIELDS = [
  {
    fieldName: 'fullName',
    fieldTitle: 'fullName',
    required: true,
  } as const,
  {
    fieldName: 'hasPreviousLicence',
    fieldTitle: 'hasPreviousLicence',
    required: false,
  } as const,
];

const PREVIOUS_LICENSE_FIELDS = [
  {
    fieldName: 'prevLastName',
    fieldTitle: 'prevLastName',
    required: false,
  } as const,
  {
    fieldName: 'prevLicenceNumber',
    fieldTitle: 'prevLicenceNumber',
    required: false,
  } as const,
];

const ALL_FIELDS = [...FIELDS, ...PREVIOUS_LICENSE_FIELDS];

describe('WHEN "useCurrentFields" is mounted', () => {
  it('AND hasPreviousLicense is true MUST return initial object', () => {
    mockWatch.mockReturnValue('yes');
    const { result } = renderHook(() => useCurrentFields(ALL_FIELDS));
    expect(result.current.hasPreviousLicence).toBeTruthy();
    expect(result.current.currentMobileFields).toStrictEqual(ALL_FIELDS);
  });
  it('AND hasPreviousLicense is false MUST return object without previous license fields', () => {
    mockWatch.mockReturnValue('no');
    const { result } = renderHook(() => useCurrentFields(ALL_FIELDS));
    expect(result.current.hasPreviousLicence).toBeFalsy();
    expect(result.current.currentMobileFields).toStrictEqual(FIELDS);
  });
});

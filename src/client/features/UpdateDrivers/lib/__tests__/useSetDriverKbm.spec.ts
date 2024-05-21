/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-internal-modules */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-destructuring */
import { renderHook } from '@testing-library/react-hooks';

import { mockAppSelector, waitForHookEffect } from 'mocks/helpers';
import { mockSendSentryClientError } from 'mocks/helpers/sendSentryClientErrorMock';

import { mapDriverExternal } from 'entities/drivers/lib/mapDriverExternal';
import type { UpdateDriversWithSwitchersForm } from 'entities/drivers/types';
import { getKbmFieldData } from 'entities/KbmDiscount';

import { FIELDS_FOR_KBM, useSetDriverKbm } from '../useSetDriverKbm';

let mockDataCalledInWatch: UpdateDriversWithSwitchersForm = {
  fullName: { value: 'А А А' },
  prevLastName: 'gdsf',
  licenceNumber: '4324234',
  prevLicenceNumber: '4324234',
  birthday: '12.12.2001',
  experienceStartDate: '12.12.2019',
  // @ts-ignore
  hasPreviousLicence: 'no',
  isDriverOwner: false,
  isDriverInsurer: false,
  kbm: {
    value: 123,
    status: 'success',
  },
};
let mockNameCalledInWatch = '';

const unsubscribe = jest.fn();

const mockWatch = (
  cb: (data: UpdateDriversWithSwitchersForm, { name }: { name: keyof UpdateDriversWithSwitchersForm }) => void,
) => {
  cb(mockDataCalledInWatch, { name: mockNameCalledInWatch as keyof UpdateDriversWithSwitchersForm });

  return { unsubscribe };
};
const mockSetValue = jest.fn();
jest.mock('@sravni/cosago-react-library/lib/hooks', () => ({
  useFormContext: jest.fn().mockImplementation(() => ({
    watch: mockWatch,
    setValue: mockSetValue,
  })),
}));

const mockIsValid = false;
const mockSetIsValid = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockImplementation(() => [mockIsValid, mockSetIsValid]),
}));

const mockRequestData = { data: { value: 0 }, isError: false, isFetching: false };
const mockRequest = jest.fn();
jest.mock('entities/drivers/model/drivers.query.ts', () => ({
  useLazySaltedGetDriverKbm: jest.fn().mockImplementation(() => [mockRequest, mockRequestData]),
}));

const mockValidateSync = jest.fn();
jest.mock('entities/drivers/model/drivers.validationSchema.ts', () => ({
  ...jest.requireActual('entities/drivers/model/drivers.validationSchema.ts'),
  FormFieldsValidationSchemaLimitedUpdateDrivers: () => ({
    validateSync: jest.fn().mockImplementation(() => mockValidateSync()),
  }),
}));

const mockUtm = { utm: { campaign: '123' } };

let shouldShowDriverKbm = false;

const testAfterFieldsChecks = () => {
  it('AND validate func called without errors AND request called without error, MUST call request with mapped data AND marker', async () => {
    mockAppSelector.mockReturnValue(mockUtm);
    renderHook(() => useSetDriverKbm(shouldShowDriverKbm));
    await waitForHookEffect();
    expect(mockValidateSync).toHaveBeenCalled();
    expect(mockSetIsValid).toHaveBeenCalledWith(true);
    expect(mockRequest).toHaveBeenCalledWith({
      driver: mapDriverExternal(mockDataCalledInWatch),
      marker: mockUtm.utm,
    });
  });
  it('AND validate func called without errors AND request called with error, MUST call sendSentryClientError with driver data', async () => {
    mockAppSelector.mockReturnValue(mockUtm);
    mockRequest.mockImplementationOnce(() => Promise.reject());
    renderHook(() => useSetDriverKbm(shouldShowDriverKbm));
    await waitForHookEffect();
    expect(mockValidateSync).toHaveBeenCalled();
    expect(mockSetIsValid).toHaveBeenCalledWith(true);
    expect(mockRequest).toHaveBeenCalled();
    expect(mockSendSentryClientError).toHaveBeenCalled();
  });

  it('AND validate func called with error, MUST call setValid with false', async () => {
    mockValidateSync.mockImplementationOnce(() => {
      throw new Error();
    });
    renderHook(() => useSetDriverKbm(shouldShowDriverKbm));
    await waitForHookEffect();
    expect(mockValidateSync).toHaveBeenCalled();
    expect(mockSetIsValid).toHaveBeenCalledWith(false);
  });
};

describe('WHEN useSetDriverKbm is called', () => {
  describe('AND shouldShowDriverKbm is true', () => {
    shouldShowDriverKbm = true;

    describe(`AND name in watch cb is exist AND ${FIELDS_FOR_KBM} includes name, MUST call driver form validate function`, () => {
      mockNameCalledInWatch = FIELDS_FOR_KBM[0];

      testAfterFieldsChecks();
    });

    describe(`AND data.kbm is not exist, MUST call driver form validate function`, () => {
      mockDataCalledInWatch = { ...mockDataCalledInWatch, kbm: undefined };
      mockNameCalledInWatch = 'IDK';

      testAfterFieldsChecks();
    });

    it('AND some property in useLazySaltedGetDriverKbm is changed, MUST call setValue with needed params', async () => {
      mockRequestData.data.value = 1.17;
      renderHook(() => useSetDriverKbm(shouldShowDriverKbm));
      await waitForHookEffect();

      expect(mockSetValue).toHaveBeenCalledWith(
        'kbm',
        getKbmFieldData(mockRequestData.data, mockRequestData.isError, mockRequestData.isFetching, mockIsValid),
      );
    });
  });
  it('AND shouldShowDriverKbm is false, MUST do nothing', () => {
    shouldShowDriverKbm = false;
    renderHook(() => useSetDriverKbm(shouldShowDriverKbm));

    expect(mockSetValue).toHaveBeenCalledTimes(0);
  });
});

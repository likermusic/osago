import { Documents } from '@sravni/cosago-react-library/lib/constants';
import type { VehicleType } from '@sravni/cosago-react-library/lib/types';
import { renderHook } from '@testing-library/react-hooks';

import { mockAppSelector, mockWatch } from 'mocks/helpers';

import type { ICarInfoMobileConfig } from '../../ui/CarInfo.config';
import { FormFields } from '../../ui/CarInfo.texts';
import { useCurrentMobileFields } from '../useCurrentMobileFields';

const mockUseIsCarModificationsAvailable = jest.fn();
jest.mock('features/UpdateCarInfo/lib/useIsCarModificationsAvailable', () => ({
  useIsCarModificationsAvailable: jest.fn().mockImplementation(() => mockUseIsCarModificationsAvailable()),
}));
const mockUseCategoryType = jest.fn();
jest.mock('../useCategoryType', () => ({
  useCategoryType: jest.fn().mockImplementation(() => mockUseCategoryType()),
}));

const FormFieldsMobileWithModificationSequence = (vehicleType: VehicleType): ICarInfoMobileConfig[] => {
  const currentFormFields = FormFields(vehicleType);

  return [
    {
      fieldName: 'carNumber',
      fieldTitle: currentFormFields.carNumber,
      required: false,
    },
    {
      fieldName: 'carBrand',
      fieldTitle: currentFormFields.carBrand,
      required: true,
    },
    {
      fieldName: 'carModel',
      fieldTitle: currentFormFields.carModel,
      required: true,
    },
    {
      fieldName: 'carManufactureYear',
      fieldTitle: currentFormFields.carManufactureYear,
      required: true,
    },
    {
      fieldName: 'enginePower',
      fieldTitle: currentFormFields.enginePower,
      required: true,
    },
    {
      fieldName: 'carModification',
      fieldTitle: currentFormFields.carModification,
      required: true,
    },
    {
      fieldName: 'documentType',
      fieldTitle: currentFormFields.documentType,
      required: true,
    },
    {
      fieldName: 'documentNumber',
      fieldTitle: currentFormFields.documentNumber,
      required: true,
    },
    {
      fieldName: 'documentIssueDate',
      fieldTitle: currentFormFields.documentIssueDate,
      required: true,
    },
    {
      fieldName: 'identifyType',
      fieldTitle: currentFormFields.identifyType,
      required: true,
    },
    {
      fieldName: 'carVinNumber',
      fieldTitle: currentFormFields.carVinNumber,
      required: true,
    },
    {
      fieldName: 'bodyNumber',
      fieldTitle: currentFormFields.bodyNumber,
      required: true,
    },
    {
      fieldName: 'chassisNumber',
      fieldTitle: currentFormFields.chassisNumber,
      required: true,
    },
    {
      fieldName: 'category',
      fieldTitle: currentFormFields.category,
      required: true,
    },
  ];
};

const FormFieldsMobileWithModificationAndVINSequence = (vehicleType: VehicleType): ICarInfoMobileConfig[] => {
  const currentFormFields = FormFields(vehicleType);

  return [
    {
      fieldName: 'carNumber',
      fieldTitle: currentFormFields.carNumber,
      required: false,
    },
    {
      fieldName: 'carBrand',
      fieldTitle: currentFormFields.carBrand,
      required: true,
    },
    {
      fieldName: 'carModel',
      fieldTitle: currentFormFields.carModel,
      required: true,
    },
    {
      fieldName: 'carManufactureYear',
      fieldTitle: currentFormFields.carManufactureYear,
      required: true,
    },
    {
      fieldName: 'enginePower',
      fieldTitle: currentFormFields.enginePower,
      required: true,
    },
    {
      fieldName: 'carModification',
      fieldTitle: currentFormFields.carModification,
      required: true,
    },
    {
      fieldName: 'documentType',
      fieldTitle: currentFormFields.documentType,
      required: true,
    },
    {
      fieldName: 'documentNumber',
      fieldTitle: currentFormFields.documentNumber,
      required: true,
    },
    {
      fieldName: 'documentIssueDate',
      fieldTitle: currentFormFields.documentIssueDate,
      required: true,
    },
    {
      fieldName: 'identifyType',
      fieldTitle: currentFormFields.identifyType,
      required: true,
    },
    {
      fieldName: 'carVinNumber',
      fieldTitle: currentFormFields.carVinNumber,
      required: true,
    },
    {
      fieldName: 'category',
      fieldTitle: currentFormFields.category,
      required: true,
    },
  ];
};

const FormFieldsMobileWithModificationAndBodyNumberSequence = (vehicleType: VehicleType): ICarInfoMobileConfig[] => {
  const currentFormFields = FormFields(vehicleType);

  return [
    {
      fieldName: 'carNumber',
      fieldTitle: currentFormFields.carNumber,
      required: false,
    },
    {
      fieldName: 'carBrand',
      fieldTitle: currentFormFields.carBrand,
      required: true,
    },
    {
      fieldName: 'carModel',
      fieldTitle: currentFormFields.carModel,
      required: true,
    },
    {
      fieldName: 'carManufactureYear',
      fieldTitle: currentFormFields.carManufactureYear,
      required: true,
    },
    {
      fieldName: 'enginePower',
      fieldTitle: currentFormFields.enginePower,
      required: true,
    },
    {
      fieldName: 'carModification',
      fieldTitle: currentFormFields.carModification,
      required: true,
    },
    {
      fieldName: 'documentType',
      fieldTitle: currentFormFields.documentType,
      required: true,
    },
    {
      fieldName: 'documentNumber',
      fieldTitle: currentFormFields.documentNumber,
      required: true,
    },
    {
      fieldName: 'documentIssueDate',
      fieldTitle: currentFormFields.documentIssueDate,
      required: true,
    },
    {
      fieldName: 'identifyType',
      fieldTitle: currentFormFields.identifyType,
      required: true,
    },
    {
      fieldName: 'bodyNumber',
      fieldTitle: currentFormFields.bodyNumber,
      required: true,
    },
    {
      fieldName: 'category',
      fieldTitle: currentFormFields.category,
      required: true,
    },
  ];
};

const FormFieldsMobileWithModificationAndChassisNumberSequence = (vehicleType: VehicleType): ICarInfoMobileConfig[] => {
  const currentFormFields = FormFields(vehicleType);

  return [
    {
      fieldName: 'carNumber',
      fieldTitle: currentFormFields.carNumber,
      required: false,
    },
    {
      fieldName: 'carBrand',
      fieldTitle: currentFormFields.carBrand,
      required: true,
    },
    {
      fieldName: 'carModel',
      fieldTitle: currentFormFields.carModel,
      required: true,
    },
    {
      fieldName: 'carManufactureYear',
      fieldTitle: currentFormFields.carManufactureYear,
      required: true,
    },
    {
      fieldName: 'enginePower',
      fieldTitle: currentFormFields.enginePower,
      required: true,
    },
    {
      fieldName: 'carModification',
      fieldTitle: currentFormFields.carModification,
      required: true,
    },
    {
      fieldName: 'documentType',
      fieldTitle: currentFormFields.documentType,
      required: true,
    },
    {
      fieldName: 'documentNumber',
      fieldTitle: currentFormFields.documentNumber,
      required: true,
    },
    {
      fieldName: 'documentIssueDate',
      fieldTitle: currentFormFields.documentIssueDate,
      required: true,
    },
    {
      fieldName: 'identifyType',
      fieldTitle: currentFormFields.identifyType,
      required: true,
    },
    {
      fieldName: 'chassisNumber',
      fieldTitle: currentFormFields.chassisNumber,
      required: true,
    },
    {
      fieldName: 'category',
      fieldTitle: currentFormFields.category,
      required: true,
    },
  ];
};

const FormFieldsMobileSequenceWithoutModification = (vehicleType: VehicleType): ICarInfoMobileConfig[] => {
  const currentFormFields = FormFields(vehicleType);

  return [
    {
      fieldName: 'carNumber',
      fieldTitle: currentFormFields.carNumber,
      required: false,
    },
    {
      fieldName: 'carBrand',
      fieldTitle: currentFormFields.carBrand,
      required: true,
    },
    {
      fieldName: 'carModel',
      fieldTitle: currentFormFields.carModel,
      required: true,
    },
    {
      fieldName: 'carManufactureYear',
      fieldTitle: currentFormFields.carManufactureYear,
      required: true,
    },
    {
      fieldName: 'enginePower',
      fieldTitle: currentFormFields.enginePower,
      required: true,
    },
    {
      fieldName: 'documentType',
      fieldTitle: currentFormFields.documentType,
      required: true,
    },
    {
      fieldName: 'documentNumber',
      fieldTitle: currentFormFields.documentNumber,
      required: true,
    },
    {
      fieldName: 'documentIssueDate',
      fieldTitle: currentFormFields.documentIssueDate,
      required: true,
    },
    {
      fieldName: 'identifyType',
      fieldTitle: currentFormFields.identifyType,
      required: true,
    },
    {
      fieldName: 'carVinNumber',
      fieldTitle: currentFormFields.carVinNumber,
      required: true,
    },
    {
      fieldName: 'bodyNumber',
      fieldTitle: currentFormFields.bodyNumber,
      required: true,
    },
    {
      fieldName: 'chassisNumber',
      fieldTitle: currentFormFields.chassisNumber,
      required: true,
    },
    {
      fieldName: 'category',
      fieldTitle: currentFormFields.category,
      required: true,
    },
  ];
};

const FormFieldsMobileWithoutCategorySequence = (vehicleType: VehicleType): ICarInfoMobileConfig[] => {
  const currentFormFields = FormFields(vehicleType);

  return [
    {
      fieldName: 'carNumber',
      fieldTitle: currentFormFields.carNumber,
      required: false,
    },
    {
      fieldName: 'carBrand',
      fieldTitle: currentFormFields.carBrand,
      required: true,
    },
    {
      fieldName: 'carModel',
      fieldTitle: currentFormFields.carModel,
      required: true,
    },
    {
      fieldName: 'carManufactureYear',
      fieldTitle: currentFormFields.carManufactureYear,
      required: true,
    },
    {
      fieldName: 'enginePower',
      fieldTitle: currentFormFields.enginePower,
      required: true,
    },
    {
      fieldName: 'carModification',
      fieldTitle: currentFormFields.carModification,
      required: true,
    },
    {
      fieldName: 'documentType',
      fieldTitle: currentFormFields.documentType,
      required: true,
    },
    {
      fieldName: 'documentNumber',
      fieldTitle: currentFormFields.documentNumber,
      required: true,
    },
    {
      fieldName: 'documentIssueDate',
      fieldTitle: currentFormFields.documentIssueDate,
      required: true,
    },
    {
      fieldName: 'identifyType',
      fieldTitle: currentFormFields.identifyType,
      required: true,
    },
    {
      fieldName: 'carVinNumber',
      fieldTitle: currentFormFields.carVinNumber,
      required: true,
    },
    {
      fieldName: 'bodyNumber',
      fieldTitle: currentFormFields.bodyNumber,
      required: true,
    },
    {
      fieldName: 'chassisNumber',
      fieldTitle: currentFormFields.chassisNumber,
      required: true,
    },
  ];
};

describe('WHEN "useCurrentMobileFields" is mounted', () => {
  describe.each(['car', 'motorcycle'] as const)('AND independent on vehicle type', (vehicleType) => {
    beforeAll(() => {
      mockAppSelector.mockReturnValue(vehicleType);
    });

    describe('AND useIsCarModificationsAvailable is true AND useCategoryType is "field"', () => {
      beforeAll(() => {
        mockUseIsCarModificationsAvailable.mockReturnValue(true);
        mockUseCategoryType.mockReturnValue('field');
      });
      it('AND modifications are available MUST return fields with modification', () => {
        mockWatch.mockReturnValue('');
        const { result } = renderHook(() => useCurrentMobileFields());
        expect(result.current).toEqual(FormFieldsMobileWithModificationSequence(vehicleType));
      });

      it('AND modifications are available AND vin is chosen MUST return fields with modification and vin', () => {
        mockWatch.mockReturnValue(Documents.CarIdentifyType.VIN);
        const { result } = renderHook(() => useCurrentMobileFields());
        expect(result.current).toEqual(FormFieldsMobileWithModificationAndVINSequence(vehicleType));
      });

      it('AND modifications are available AND body number is chosen MUST return fields with modification and body number', () => {
        mockWatch.mockReturnValue(Documents.CarIdentifyType.BodyNumber);
        const { result } = renderHook(() => useCurrentMobileFields());
        expect(result.current).toEqual(FormFieldsMobileWithModificationAndBodyNumberSequence(vehicleType));
      });

      it('AND modifications are available AND chassis number is chosen MUST return fields with modification and chassis number', () => {
        mockWatch.mockReturnValue(Documents.CarIdentifyType.ChassisNumber);
        const { result } = renderHook(() => useCurrentMobileFields());
        expect(result.current).toEqual(FormFieldsMobileWithModificationAndChassisNumberSequence(vehicleType));
      });
    });

    it('AND modifications are not available AND category type is "field" MUST return fields without modification', () => {
      mockUseIsCarModificationsAvailable.mockReturnValue(false);
      mockUseCategoryType.mockReturnValue('field');
      mockWatch.mockReturnValue('');
      const { result } = renderHook(() => useCurrentMobileFields());
      expect(result.current).toEqual(FormFieldsMobileSequenceWithoutModification(vehicleType));
    });

    it('AND modifications are available AND category type is not "field" MUST return fields without modification', () => {
      mockUseIsCarModificationsAvailable.mockReturnValue(true);
      mockUseCategoryType.mockReturnValue(null);
      mockWatch.mockReturnValue('');
      const { result } = renderHook(() => useCurrentMobileFields());
      expect(result.current).toEqual(FormFieldsMobileWithoutCategorySequence(vehicleType));
    });
  });
});

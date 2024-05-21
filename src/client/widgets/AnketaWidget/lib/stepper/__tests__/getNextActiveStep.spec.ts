import { generateSteps } from '../generateSteps';
import { getNextActiveStep } from '../getNextActiveStep';

describe('WHEN "getNextActiveStep" is called', () => {
  const forms = {
    policyInfo: {
      isFullFilled: true,
      isActive: true,
    },
    carInfo: {
      isFullFilled: true,
      isActive: true,
    },
    carOwner: {
      isFullFilled: true,
      isActive: true,
    },
    contacts: {
      isFullFilled: true,
      isActive: true,
    },
    drivers: {
      isFullFilled: true,
      isActive: true,
      multipleFormsData: {
        id: { isFullFilled: true },
        id1: { isFullFilled: true },
      },
    },
    policyHolder: {
      isActive: true,
      isFullFilled: true,
    },
  };

  const steps = generateSteps(forms, false);

  it.each([
    [
      'AND "carInfo" form is not filled',
      { ...forms, carInfo: { isFullFilled: false, isActive: true } },
      {
        formId: 'carInfo',
        stepIndex: steps.findIndex(({ formId }) => formId === 'carInfo') + 1,
        type: 'single',
      },
    ],
    [
      'AND "carOwner" form is not filled',
      { ...forms, carOwner: { isFullFilled: false, isActive: true } },
      {
        formId: 'carOwner',
        stepIndex: steps.findIndex(({ formId }) => formId === 'carOwner') + 1,
        type: 'single',
      },
    ],
    [
      'AND "contacts" form is not filled',
      { ...forms, contacts: { isFullFilled: false, isActive: true } },
      {
        formId: 'contacts',
        stepIndex: steps.findIndex(({ formId }) => formId === 'contacts') + 1,
        type: 'single',
      },
    ],
    [
      'AND "policyHolder" form is not filled',
      { ...forms, policyHolder: { isFullFilled: false, isActive: true } },
      {
        formId: 'policyHolder',
        stepIndex: steps.findIndex(({ formId }) => formId === 'policyHolder') + 1,
        type: 'single',
      },
    ],
    [
      'AND "drivers.id" form is not filled',
      {
        ...forms,
        drivers: {
          isFullFilled: true,
          isActive: true,
          multipleFormsData: {
            ...forms.drivers.multipleFormsData,
            id: { isFullFilled: false },
          },
        },
      },
      {
        formId: 'drivers',
        stepIndex: steps.findIndex(({ formId }) => formId === 'drivers') + 1,
        type: 'multipart',
        multipartFormId: 'id',
      },
    ],
    [
      'AND "drivers.id1" form is not filled',
      {
        ...forms,
        drivers: {
          isFullFilled: true,
          isActive: true,
          multipleFormsData: {
            ...forms.drivers.multipleFormsData,
            id1: { isFullFilled: false, isActive: true },
          },
        },
      },
      {
        formId: 'drivers',
        multipartFormId: 'id1',
        stepIndex: steps.findIndex(({ formId }) => formId === 'drivers') + 2,
        type: 'multipart',
      },
    ],
  ])('%s, MUST find next step for form that was not fullFilled', (_, actualForms, result) => {
    expect(
      getNextActiveStep({
        steps,
        forms: actualForms,
      }),
    ).toEqual(result);
  });
});

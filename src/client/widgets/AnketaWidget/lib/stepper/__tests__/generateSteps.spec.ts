import { generateSteps } from '../generateSteps';

describe('WHEN "generateSteps" is called', () => {
  it('MUST returns list of steps for forms navigations', () => {
    expect(
      generateSteps(
        {
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
            isFullFilled: true,
            isActive: true,
          },
        },
        false,
      ),
    ).toEqual([
      {
        formId: 'policyInfo',
        stepIndex: 1,
        type: 'single',
      },
      {
        formId: 'carInfo',
        stepIndex: 2,
        type: 'single',
      },
      {
        formId: 'drivers',
        multipartFormId: 'id',
        stepIndex: 3,
        type: 'multipart',
      },
      {
        formId: 'drivers',
        multipartFormId: 'id1',
        stepIndex: 4,
        type: 'multipart',
      },
      {
        formId: 'carOwner',
        stepIndex: 5,
        type: 'single',
      },
      {
        formId: 'policyHolder',
        stepIndex: 6,
        type: 'single',
      },
      {
        formId: 'contacts',
        stepIndex: 7,
        type: 'single',
      },
    ]);
  });

  it('MUST ignore inactive steps', () => {
    expect(
      generateSteps(
        {
          policyInfo: {
            isFullFilled: true,
            isActive: true,
          },
          carInfo: {
            isFullFilled: true,
            isActive: false,
          },
          carOwner: {
            isFullFilled: true,
            isActive: false,
          },
          contacts: {
            isFullFilled: true,
            isActive: false,
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
            isFullFilled: true,
            isActive: true,
          },
        },
        false,
      ),
    ).toEqual([
      {
        formId: 'policyInfo',
        stepIndex: 1,
        type: 'single',
      },
      {
        formId: 'drivers',
        multipartFormId: 'id',
        stepIndex: 2,
        type: 'multipart',
      },
      {
        formId: 'drivers',
        multipartFormId: 'id1',
        stepIndex: 3,
        type: 'multipart',
      },
      {
        formId: 'policyHolder',
        stepIndex: 4,
        type: 'single',
      },
    ]);
  });

  it('AND multi drive is enabled, MUST ignore all drivers except first', () => {
    expect(
      generateSteps(
        {
          policyInfo: {
            isFullFilled: true,
            isActive: true,
          },
          carInfo: {
            isFullFilled: true,
            isActive: false,
          },
          carOwner: {
            isFullFilled: true,
            isActive: false,
          },
          contacts: {
            isFullFilled: true,
            isActive: false,
          },
          drivers: {
            isFullFilled: true,
            isActive: true,
            isMultiDrive: true,
            multipleFormsData: {
              id: { isFullFilled: true },
              id1: { isFullFilled: true },
            },
          },
          policyHolder: {
            isFullFilled: true,
            isActive: true,
          },
        },
        false,
      ),
    ).toEqual([
      {
        formId: 'policyInfo',
        stepIndex: 1,
        type: 'single',
      },
      {
        formId: 'drivers',
        multipartFormId: 'id',
        stepIndex: 2,
        type: 'multipart',
      },
      {
        formId: 'policyHolder',
        stepIndex: 3,
        type: 'single',
      },
    ]);
  });
});

import { identity } from 'lodash/fp';

import type { OwnerCommonFields } from 'entities/owner';
import { PolicyHolderType } from 'entities/owner';

import { submitOwnerForm } from '../submitOwnerForm';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockGetState = () =>
  ({
    carInfo: {
      data: {},
    },
    owner: {
      data: {},
    },
    insurer: {},
  } as Store);

beforeEach(() => {
  mockDispatch.mockReset();
});

const mockSetInsurerByPolicyHolder = jest.fn();
jest.mock('../setInsurerByOwnerDataThunk', () => ({
  setInsurerByOwnerDataThunk: jest.fn().mockImplementation(() => mockSetInsurerByPolicyHolder()),
}));

describe('WHEN "submitOwnerForm" is called', () => {
  it('MUST call setInsurerByOwnerData', async () => {
    const actualData = { birthday: '123', policyHolder: PolicyHolderType.Owner };
    await submitOwnerForm(actualData as OwnerCommonFields, identity, false)(mockDispatch, mockGetState, undefined);
    expect(mockSetInsurerByPolicyHolder).toHaveBeenCalled();
  });

  it('MUST call getPolicyInfo', async () => {
    const mockGetPolicyInfo = jest.fn();
    const actualData = { birthday: '123', policyHolder: PolicyHolderType.Owner };
    await submitOwnerForm(actualData as OwnerCommonFields, mockGetPolicyInfo, false)(
      mockDispatch,
      mockGetState,
      undefined,
    );
    expect(mockGetPolicyInfo).toHaveBeenCalled();
  });
});

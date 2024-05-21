import { TEST_ERROR } from 'mocks/helpers';

import { navigateWithProlongationThunk } from '../NavigateWithProlongation.thunks';

describe('WHEN "navigateWithProlongationThunk" is called', () => {
  const navigateToAnketa = jest.fn();
  const navigateToProposition = jest.fn();
  const startPrevCalculation = jest.fn();
  const getState = jest.fn();

  const state = {
    user: {
      isLoggedIn: true,
      account: {
        phone_number: '+79042510000',
      },
    },
    prolongation: {
      prolongationPolicyByCarNumber: {
        orderHash: 'hash',
        maskedPhone: '+7904251****',
        type: 'shortProlongation',
      },
    },
  };

  beforeEach(() => {
    navigateToAnketa.mockReset();
    navigateToProposition.mockReset();
    startPrevCalculation.mockReset();
  });

  it('AND user is not logged in, MUST do nothing', () => {
    getState.mockReturnValue({
      user: {},
      prolongation: {},
    });
    navigateWithProlongationThunk(navigateToAnketa, navigateToProposition, startPrevCalculation)(
      jest.fn(),
      getState,
      undefined,
    );

    expect(navigateToAnketa).not.toBeCalled();
    expect(navigateToProposition).not.toBeCalled();
    expect(startPrevCalculation).not.toBeCalled();
  });

  it('AND prolongation does not present, MUST do nothing', () => {
    getState.mockReturnValue({ ...state, prolongation: {} });

    navigateWithProlongationThunk(navigateToAnketa, navigateToProposition, startPrevCalculation)(
      jest.fn(),
      getState,
      undefined,
    );

    expect(navigateToAnketa).not.toBeCalled();
    expect(navigateToProposition).not.toBeCalled();
    expect(startPrevCalculation).not.toBeCalled();
  });

  describe('AND user is logged in AND prolongation is presented', () => {
    it('AND orderHash was provided, MUST navigate on propositions', () => {
      getState.mockReturnValue(state);

      navigateWithProlongationThunk(navigateToAnketa, navigateToProposition, startPrevCalculation)(
        jest.fn(),
        getState,
        undefined,
      );

      expect(navigateToAnketa).not.toBeCalled();
      expect(navigateToProposition).toBeCalledWith(state.prolongation.prolongationPolicyByCarNumber.orderHash);
      expect(startPrevCalculation).not.toBeCalled();
    });

    describe('AND current user phone is equal phone from prolongation', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          ...state,
          prolongation: {
            prolongationPolicyByCarNumber: {
              ...state.prolongation.prolongationPolicyByCarNumber,
              orderHash: '',
            },
          },
        });
      });

      it('MUST try to get previous calculation by car number', () => {
        navigateWithProlongationThunk(navigateToAnketa, navigateToProposition, startPrevCalculation)(
          jest.fn(),
          getState,
          undefined,
        );

        expect(startPrevCalculation).toBeCalled();
      });

      it('AND request was succeed AND order hash was provided, MUST navigate on propositions', async () => {
        startPrevCalculation.mockResolvedValue(state.prolongation.prolongationPolicyByCarNumber.orderHash);

        await navigateWithProlongationThunk(navigateToAnketa, navigateToProposition, startPrevCalculation)(
          jest.fn(),
          getState,
          undefined,
        );

        expect(navigateToProposition).toBeCalled();
      });

      it('AND request was failure, MUST navigate on anketa', async () => {
        startPrevCalculation.mockRejectedValue(TEST_ERROR);

        await navigateWithProlongationThunk(navigateToAnketa, navigateToProposition, startPrevCalculation)(
          jest.fn(),
          getState,
          undefined,
        );

        expect(navigateToAnketa).toBeCalled();
      });

      it('AND order hash was not provided, MUST navigate on anketa', async () => {
        startPrevCalculation.mockResolvedValue(null);

        await navigateWithProlongationThunk(navigateToAnketa, navigateToProposition, startPrevCalculation)(
          jest.fn(),
          getState,
          undefined,
        );

        expect(navigateToAnketa).toBeCalled();
      });
    });
  });
});

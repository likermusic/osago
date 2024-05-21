// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mockedNanoid } from 'mocks/helpers';

import { formReadyForSendingSelector } from '../AnketaWidget.selectors';

describe('WHEN "formReadyForSendingSelector" is called', () => {
  const state = {
    drivers: {
      isFullFilled: false, // <- в мультиформах он игнорируется
      multipleFormsData: {
        1: {
          isFullFilled: true,
        },
      },
    },
    owner: {
      isFullFilled: true,
    },
    contacts: {
      isFullFilled: true,
    },
    carInfo: {
      isFullFilled: true,
    },
    insurer: {
      isFullFilled: true,
    },
  };

  beforeEach(() => {
    mockedNanoid.mockReturnValue(1);
  });

  it('AND all forms are ready to send, MUST return true', () => {
    // @ts-ignore
    expect(formReadyForSendingSelector(state)).toBeTruthy();
  });

  it('AND even one form are not ready to send, MUST return false', () => {
    // @ts-ignore
    expect(formReadyForSendingSelector({ ...state, carInfo: { ...state.carInfo, isFullFilled: false } })).toBeFalsy();
  });
});

import { MockPersistedStore } from 'mocks/helpers/localStorage';

import { contactsSlice } from 'entities/contacts';

import { initUserContactsDefaults } from 'app/MyApp/lib/usePersistedStore/initUserContactsDefaults';

describe('WHEN "initUserContactsDefaults" is called', () => {
  const account = {
    phone_number: '+79042510000',
    email: 'test@yandex.ru',
  };

  const testController = new MockPersistedStore();
  const mockGetState = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    MockPersistedStore.onGetStore.mockReturnValue({
      getState: mockGetState,
      dispatch: mockDispatch,
    });
  });

  it('AND user is logged in, MUST initiate contact form', () => {
    mockGetState.mockReturnValue({
      user: {
        account,
      },
    });

    initUserContactsDefaults(testController);

    expect(mockDispatch).toHaveBeenCalledWith(
      contactsSlice.actions.setContactsDefault({
        mobilePhone: account.phone_number ?? '',
        email: account.email ?? '',
        smsCode: '',
        userAgreement: false,
      }),
    );
  });

  it('AND user is not logged in, MUST NOT initiate contact form', () => {
    mockGetState.mockReturnValue({
      user: {
        account: null,
      },
    });

    initUserContactsDefaults(testController);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});

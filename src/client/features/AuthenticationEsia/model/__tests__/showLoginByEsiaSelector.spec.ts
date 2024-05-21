import { showLoginByEsiaSelector } from '../AuthenticationEsia.selectors';

const mockGetStorageItem = jest.fn();
jest.mock('shared/lib/customStorage', () => ({
  customLocalStorage: {
    get: () => mockGetStorageItem(),
  },
}));
describe('WHEN "showLoginByEsiaSelector" is called', () => {
  const state = (user: Record<string, unknown>, carNumber?: string): AppStore => ({
    user,
    carInfo: {
      data: {
        carNumber,
      },
    },
  });

  it('AND user is not logged, MUST show esia login banner', () => {
    expect(
      showLoginByEsiaSelector(
        state({
          isLoggedIn: false,
          account: {
            isHasEsia: false,
          },
        }),
      ),
    ).toBeTruthy();
  });

  describe('AND user is logged', () => {
    it('AND user has esia integration, MUST NOT show esia login banner', () => {
      expect(
        showLoginByEsiaSelector(
          state({
            isLoggedIn: true,
            account: {
              isHasEsia: true,
            },
          }),
        ),
      ).toBeFalsy();
    });

    it('AND user has not esia integration, MUST show esia login banner', () => {
      expect(
        showLoginByEsiaSelector(
          state({
            isLoggedIn: true,
            account: {
              isHasEsia: false,
            },
          }),
        ),
      ).toBeTruthy();
    });

    it('AND user failed to register by esia, MUST NOT show esia login banner', () => {
      expect(
        showLoginByEsiaSelector(
          state({
            isLoggedIn: true,
            esiaErrorCount: 3,
            account: {
              isHasEsia: false,
            },
          }),
        ),
      ).toBeFalsy();
    });

    it.each([
      [
        'insurer data',
        {
          c911tt33: {
            insurer: {
              fullName: 'Иван Иванович',
            },
          },
        },
      ],
      [
        'owner data',
        {
          c911tt33: {
            owner: {
              fullName: 'Иван Иванович',
            },
          },
        },
      ],
      [
        'drivers data',
        {
          c911tt33: {
            driversInfo: {
              drivers: [{ fullName: 'Иван Иванович' }],
            },
          },
        },
      ],
    ])('AND user has %p in localStorage, MUST NOT show esia login banner', (_, data) => {
      mockGetStorageItem.mockReturnValue(JSON.stringify(data));

      expect(
        showLoginByEsiaSelector(
          state(
            {
              isLoggedIn: true,
              isEsiaError: false,
              account: {
                isHasEsia: false,
              },
            },
            'c911tt33',
          ),
        ),
      ).toBeFalsy();
    });
  });
});

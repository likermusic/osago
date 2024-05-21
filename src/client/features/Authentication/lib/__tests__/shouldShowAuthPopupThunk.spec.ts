import { shouldShowAuthPopupOnSummaryThunk } from '../shouldShowAuthPopupOnSummaryThunk';

const mockDispatch = jest.fn().mockName('mockDispatch');
const getState = jest.fn().mockName('getState');

const userId1 = 'userId1';
const userId2 = 'userId2';

const phone1 = '79999999999';
const phone2 = '79123456789';

type GenerateStore = {
  phoneFromQuery: unknown;
  isUserLoggedIn: unknown;
  userIdFromQuery: unknown;
  userIdFromStore: unknown;
  phoneFromStore: unknown;
};

const generateStore = ({
  phoneFromQuery,
  isUserLoggedIn,
  userIdFromQuery,
  userIdFromStore,
  phoneFromStore,
}: GenerateStore) => ({
  user: {
    isLoggedIn: isUserLoggedIn,
    account: {
      sub: userIdFromStore,
      phone_number: phoneFromStore,
    },
    restoredAccount: {
      sub: userIdFromQuery,
      phone_number: phoneFromQuery,
    },
  },
});

describe('WHEN "shouldShowAuthPopupOnSummary" is called', () => {
  // Авторизован, есть юзер айди и он совпадает  -  нет поп апа на саммари
  // Авторизован, есть юзер айди и он не совпадает  -  есть поп ап на саммари
  // Авторизован, нет юзер айди и телефон совпадает - нет поп -апа на саммари
  // Авторизован, нет юзер айди и телефон не совпадает - есть поп -апа на саммари
  describe('AND user is logged in', () => {
    describe('AND userId was restored', () => {
      it.each`
        userIdFromQuery | userIdFromStore | phoneFromQuery | phoneFromStore
        ${userId1}      | ${userId1}      | ${phone1}      | ${phone1}
        ${userId1}      | ${userId1}      | ${phone1}      | ${phone2}
        ${userId1}      | ${userId1}      | ${undefined}   | ${undefined}
      `(
        '$# AND userID from query the same with auth userID AND regardless of the phone number MUST return false',
        ({ phoneFromQuery, userIdFromQuery, userIdFromStore, phoneFromStore }) => {
          getState.mockReturnValue(
            generateStore({ phoneFromQuery, userIdFromQuery, userIdFromStore, phoneFromStore, isUserLoggedIn: true }),
          );

          expect(shouldShowAuthPopupOnSummaryThunk()(mockDispatch, getState, undefined)).toBeFalsy();
        },
      );

      it.each`
        userIdFromQuery | userIdFromStore | phoneFromQuery | phoneFromStore
        ${userId1}      | ${userId2}      | ${phone1}      | ${phone1}
        ${userId1}      | ${userId2}      | ${phone1}      | ${phone2}
        ${userId1}      | ${userId2}      | ${undefined}   | ${undefined}
      `(
        '$# AND userID from query is not the same with auth userID AND regardless of the phone number MUST return true',
        ({ phoneFromQuery, userIdFromQuery, userIdFromStore, phoneFromStore }) => {
          getState.mockReturnValue(
            generateStore({ phoneFromQuery, userIdFromQuery, userIdFromStore, phoneFromStore, isUserLoggedIn: true }),
          );

          expect(shouldShowAuthPopupOnSummaryThunk()(mockDispatch, getState, undefined)).toBeTruthy();
        },
      );
    });

    describe('AND userId was not restored', () => {
      it('AND phone is the same MUST return false', () => {
        getState.mockReturnValue(
          generateStore({
            phoneFromQuery: phone1,
            userIdFromQuery: undefined,
            userIdFromStore: userId1,
            phoneFromStore: phone1,
            isUserLoggedIn: true,
          }),
        );
        expect(shouldShowAuthPopupOnSummaryThunk()(mockDispatch, getState, undefined)).toBeFalsy();
      });

      it('AND phone is not the same MUST return true', () => {
        getState.mockReturnValue(
          generateStore({
            phoneFromQuery: phone2,
            userIdFromQuery: undefined,
            userIdFromStore: userId1,
            phoneFromStore: phone1,
            isUserLoggedIn: true,
          }),
        );
        expect(shouldShowAuthPopupOnSummaryThunk()(mockDispatch, getState, undefined)).toBeTruthy();
      });

      it('AND phone is not exist in query MUST return true', () => {
        getState.mockReturnValue(
          generateStore({
            phoneFromQuery: undefined,
            userIdFromQuery: undefined,
            userIdFromStore: userId1,
            phoneFromStore: phone1,
            isUserLoggedIn: true,
          }),
        );
        expect(shouldShowAuthPopupOnSummaryThunk()(mockDispatch, getState, undefined)).toBeTruthy();
      });
    });

    it('AND account data was not restored MUST return false', () => {
      getState.mockReturnValue({
        user: {
          isLoggedIn: true,
          account: {
            sub: userId1,
            phone_number: phone1,
          },
          restoredAccount: null,
        },
      });
      expect(shouldShowAuthPopupOnSummaryThunk()(mockDispatch, getState, undefined)).toBeFalsy();
    });
  });

  // Не авторизован - есть юзер айди - нет поп апа на саммари
  // Не авторизован - нет юзер айди - есть поп ап на саммари
  describe('AND user is not logged in', () => {
    it.each`
      userIdFromQuery | userIdFromStore | phoneFromQuery | phoneFromStore
      ${userId1}      | ${undefined}    | ${phone1}      | ${phone1}
      ${userId1}      | ${undefined}    | ${phone1}      | ${phone2}
      ${userId1}      | ${undefined}    | ${undefined}   | ${undefined}
    `(
      '$# AND userID exist in query AND regardless of the phone number MUST return false',
      ({ phoneFromQuery, userIdFromQuery, userIdFromStore, phoneFromStore }) => {
        getState.mockReturnValue(
          generateStore({ phoneFromQuery, userIdFromQuery, userIdFromStore, phoneFromStore, isUserLoggedIn: false }),
        );

        expect(shouldShowAuthPopupOnSummaryThunk()(mockDispatch, getState, undefined)).toBeFalsy();
      },
    );

    it.each`
      userIdFromQuery | userIdFromStore | phoneFromQuery | phoneFromStore
      ${undefined}    | ${undefined}    | ${phone1}      | ${phone1}
      ${undefined}    | ${undefined}    | ${phone1}      | ${phone2}
      ${undefined}    | ${undefined}    | ${undefined}   | ${undefined}
    `(
      '$# AND userID not exist in query AND regardless of the phone number MUST return true',
      ({ phoneFromQuery, userIdFromQuery, userIdFromStore, phoneFromStore }) => {
        getState.mockReturnValue(
          generateStore({ phoneFromQuery, userIdFromQuery, userIdFromStore, phoneFromStore, isUserLoggedIn: false }),
        );

        expect(shouldShowAuthPopupOnSummaryThunk()(mockDispatch, getState, undefined)).toBeTruthy();
      },
    );
  });
});

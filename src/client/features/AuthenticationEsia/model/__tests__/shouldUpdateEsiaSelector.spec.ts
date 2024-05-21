import { generateProfilePersonMock } from 'mocks/helpers';

import { FormStepId } from 'shared/config/formStepId';

import { shouldUpdateEsiaSelector } from '../AuthenticationEsia.selectors';

describe('WHEN "shouldUpdateEsiaSelector" is called', () => {
  const generateState = ({
    isFromEsia,
    isOwnerFilledByEsia,
    isInsurerFilledByEsia,
    isDriverFilledByEsia,
    isContactsFilledByEsia,
  }: {
    isFromEsia?: boolean;
    isOwnerFilledByEsia?: boolean;
    isInsurerFilledByEsia?: boolean;
    isDriverFilledByEsia?: boolean;
    isContactsFilledByEsia?: boolean;
  }): AppStore => ({
    people: {
      people: [
        generateProfilePersonMock('Иванов Иван Иванович', {
          isFromEsia,
        }),
      ],
    },
    owner: {
      data: { fullName: isOwnerFilledByEsia ? 'Иванов Иван Иванович' : '' },
    },
    insurer: {
      data: { fullName: isInsurerFilledByEsia ? 'Иванов Иван Иванович' : '' },
    },
    drivers: {
      multipleFormsData: {
        1: {
          data: { fullName: isDriverFilledByEsia ? 'Иванов Иван Иванович' : '' },
        },
      },
    },
    contacts: {
      data: {
        email: isContactsFilledByEsia ? 'email' : '',
        mobilePhone: isContactsFilledByEsia ? 'phone' : '',
      },
    },
  });

  describe('AND profile service returns person with esia', () => {
    it('AND owner is already filled by esia, MUST return false', () => {
      expect(
        shouldUpdateEsiaSelector(
          generateState({
            isFromEsia: true,
            isOwnerFilledByEsia: true,
          }),
        ).carOwner,
      ).toBeFalsy();
    });

    it('AND driver is already filled by esia, MUST return false', () => {
      expect(
        shouldUpdateEsiaSelector(
          generateState({
            isFromEsia: true,
            isDriverFilledByEsia: true,
          }),
        ).drivers,
      ).toBeFalsy();
    });

    it('AND insurer is already filled by esia, MUST return "false"', () => {
      expect(
        shouldUpdateEsiaSelector(
          generateState({
            isFromEsia: true,
            isInsurerFilledByEsia: true,
          }),
        ).policyHolder,
      ).toBeFalsy();
    });

    it('AND contacts is already filled by esia, MUST return "false"', () => {
      expect(
        shouldUpdateEsiaSelector(
          generateState({
            isFromEsia: true,
            isContactsFilledByEsia: true,
          }),
        ).contacts,
      ).toBeFalsy();
    });

    it.each([[FormStepId.CarOwner], [FormStepId.PolicyHolder], [FormStepId.Drivers], [FormStepId.Contacts]])(
      'AND no one block was filled by esia, MUST return true',
      (step) => {
        expect(
          shouldUpdateEsiaSelector(
            generateState({
              isFromEsia: true,
              isInsurerFilledByEsia: false,
              isDriverFilledByEsia: false,
              isOwnerFilledByEsia: false,
              isContactsFilledByEsia: false,
            }),
          )[step],
        ).toBeTruthy();
      },
    );
  });
});

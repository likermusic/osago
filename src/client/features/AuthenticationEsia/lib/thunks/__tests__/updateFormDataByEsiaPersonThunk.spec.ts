import { Documents } from '@sravni/cosago-react-library/lib/constants';

import { generateProfilePersonMock } from 'mocks/helpers';

import { FormStepId } from 'shared/config/formStepId';

import { setContactsData } from 'entities/contacts';
import { updateDriverByEsia } from 'entities/drivers';
import { setInsurerData } from 'entities/insurer';
import { PolicyHolderType, setOwnerData, updatePolicyHolder } from 'entities/owner';
import { convertPersonToFormFields } from 'entities/people';

import { updateFormDataByEsiaPersonThunk } from '../updateFormDataByEsiaPersonThunk';

describe('WHEN "updateFormDataByEsiaPersonThunk" is called', () => {
  const dispatchMock = jest.fn();
  const getState =
    (
      step: string,
      isFromEsia: boolean,
      isEmailFilled?: boolean,
      isPolicyholderUpdated?: boolean,
      isPhoneFilled = true,
    ) =>
    (): AppStore => ({
      user: {
        esiaStep: step,
      },
      people: {
        people: [
          generateProfilePersonMock('Иванов Иван Иванович', {
            isFromEsia,
            email: 'test@yandex.ru',
          }),
        ],
      },
      carInfo: {
        data: {
          documentIssueDate: 'documentIssueDate',
          documentType: Documents.ECarDocumentType.STS,
        },
      },
      contacts: {
        data: {
          email: isEmailFilled ? 'email@yandex.ru' : '',
          mobilePhone: isPhoneFilled ? 'some phone number' : '',
          smsCode: '',
          userAgreement: false,
        },
      },
      owner: {
        data: {
          fullName: '',
          policyHolder: PolicyHolderType.Other,
        },
      },
      insurer: {
        data: {
          fullName: isPolicyholderUpdated ? 'Иванов Иван Иванович' : '',
        },
      },
      drivers: {
        multipleFormsData: {
          1: {},
        },
      },
    });

  it('AND provided step is drivers, MUST update drivers, owner and insurer blocks', async () => {
    const state = getState(FormStepId.Drivers, true);
    const esiaPerson = convertPersonToFormFields(state().people.people[0]);

    await updateFormDataByEsiaPersonThunk()(dispatchMock, getState(FormStepId.Drivers, true), undefined);

    expect(dispatchMock).toHaveBeenCalledWith(updateDriverByEsia(esiaPerson));

    expect(dispatchMock).toHaveBeenCalledWith(
      setOwnerData({
        data: {
          ...esiaPerson,
          policyHolder: PolicyHolderType.Owner,
        },
        carDocumentIssueDate: 'documentIssueDate',
        carDocumentType: Documents.ECarDocumentType.STS,
        isFilledByEsiaStatus: true,
        isFullFilled: false,
      }),
    );

    expect(dispatchMock).toHaveBeenCalledWith(
      setInsurerData({
        values: esiaPerson,
        isActive: false,
        isFilledByEsiaStatus: true,
        isFullFilled: false,
      }),
    );
  });

  describe('AND provided step is owner', () => {
    it('MUST update owner and insurer blocks', () => {
      const state = getState(FormStepId.CarOwner, true);
      const esiaPerson = convertPersonToFormFields(state().people.people[0]);

      updateFormDataByEsiaPersonThunk()(dispatchMock, getState(FormStepId.CarOwner, true), undefined);

      expect(dispatchMock).toHaveBeenCalledWith(
        setOwnerData({
          data: {
            ...esiaPerson,
            policyHolder: PolicyHolderType.Owner,
          },
          carDocumentIssueDate: 'documentIssueDate',
          carDocumentType: Documents.ECarDocumentType.STS,
          isFilledByEsiaStatus: true,
          isFullFilled: false,
        }),
      );

      expect(dispatchMock).toHaveBeenCalledWith(
        setInsurerData({
          values: esiaPerson,
          isActive: false,
          isFilledByEsiaStatus: true,
          isFullFilled: false,
        }),
      );
    });

    it('AND policyholder was changed on driver step, MUST update owner only', () => {
      const state = getState(FormStepId.CarOwner, true);

      const esiaPerson = convertPersonToFormFields(state().people.people[0]);

      updateFormDataByEsiaPersonThunk()(dispatchMock, getState(FormStepId.CarOwner, true, false, true), undefined);

      expect(dispatchMock).toHaveBeenCalledWith(
        setOwnerData({
          data: {
            ...esiaPerson,
            policyHolder: PolicyHolderType.Other,
          },
          carDocumentIssueDate: 'documentIssueDate',
          carDocumentType: Documents.ECarDocumentType.STS,
          isFilledByEsiaStatus: true,
          isFullFilled: false,
        }),
      );

      expect(dispatchMock).not.toHaveBeenCalledWith(
        setInsurerData({
          values: esiaPerson,
          isActive: false,
          isFilledByEsiaStatus: true,
        }),
      );
    });
  });

  it('AND provided step is insurer, MUST update only insurer blocks', () => {
    const state = getState(FormStepId.PolicyHolder, true);
    const esiaPerson = convertPersonToFormFields(state().people.people[0]);

    updateFormDataByEsiaPersonThunk()(dispatchMock, getState(FormStepId.PolicyHolder, true), undefined);

    expect(dispatchMock).toHaveBeenCalledWith(updatePolicyHolder(PolicyHolderType.Other));

    expect(dispatchMock).toHaveBeenCalledWith(
      setInsurerData({
        values: esiaPerson,
        isActive: true,
        isFilledByEsiaStatus: true,
        isFullFilled: false,
      }),
    );
  });

  describe('AND provided step is contacts', () => {
    describe('AND email in store is empty', () => {
      it('AND phone empty too, MUST update contacts blocks', () => {
        updateFormDataByEsiaPersonThunk()(
          dispatchMock,
          getState(FormStepId.Contacts, true, false, false, false),
          undefined,
        );

        expect(dispatchMock).toHaveBeenCalledWith(
          setContactsData({
            data: {
              mobilePhone: '',
              smsCode: '',
              email: 'test@yandex.ru',
              userAgreement: false,
            },
            isFullFilled: false,
            isFilledByEsiaStatus: false,
          }),
        );
      });

      it('AND phone is empty in store, MUST update contacts blocks', () => {
        updateFormDataByEsiaPersonThunk()(
          dispatchMock,
          getState(FormStepId.Contacts, true, false, false, true),
          undefined,
        );

        expect(dispatchMock).toHaveBeenCalledWith(
          setContactsData({
            data: {
              mobilePhone: 'some phone number',
              smsCode: '',
              email: 'test@yandex.ru',
              userAgreement: false,
            },
            isFullFilled: false,
            isFilledByEsiaStatus: false,
          }),
        );
      });
    });

    it('AND email in store is not empty, MUST NOT update contacts blocks', () => {
      updateFormDataByEsiaPersonThunk()(dispatchMock, getState(FormStepId.Contacts, true, true), undefined);

      expect(dispatchMock).not.toHaveBeenCalled();
    });
  });
});

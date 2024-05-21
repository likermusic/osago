import type { UpdateDriversWithSwitchersForm } from 'entities/drivers';
import { updatePeopleData } from 'entities/people';

export const updatePeopleDataByDriverThunk =
  (actualData: UpdateDriversWithSwitchersForm): ThunkResult<void> =>
  async (dispatch) => {
    const { passportNumber, passportIssueDate, registrationAddress, registrationAddressFlat } = actualData;

    dispatch(
      updatePeopleData({
        ...actualData,
        hasPreviousLicence: !!actualData.hasPreviousLicence,
        fullName: typeof actualData.fullName?.value === 'string' ? actualData.fullName?.value : '',
        passportNumber,
        passportIssueDate,
        address: {
          source: registrationAddress?.data
            ? {
                data: {
                  fias_level: registrationAddress.data.fias_level ? registrationAddress.data.fias_level : '8',
                  region: String(registrationAddress.data.region),
                },
              }
            : undefined,
          value: typeof registrationAddress?.value === 'string' ? registrationAddress.value : '',
        },
        addressFlat: registrationAddressFlat ?? '',
      }),
    );
  };

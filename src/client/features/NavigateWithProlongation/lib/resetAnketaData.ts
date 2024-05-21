import { resetCarInfo } from 'entities/carInfo';
import { resetContacts } from 'entities/contacts';
import { resetDrivers } from 'entities/drivers';
import { resetInsurer } from 'entities/insurer';
import { resetOwner } from 'entities/owner';
import { setShouldResetAnketa, shouldResetAnketaSelector } from 'entities/restoredQuery';

export const resetAnketaDataThunk = (): ThunkResult<void> => (dispatch, getState) => {
  dispatch(resetCarInfo());
  // не ресетим данные анкеты если восстановили данные по квере
  if (shouldResetAnketaSelector(getState())) {
    dispatch(resetDrivers());
    dispatch(resetInsurer());
    dispatch(resetOwner());
    dispatch(resetContacts());
  } else {
    dispatch(setShouldResetAnketa(true));
  }
};

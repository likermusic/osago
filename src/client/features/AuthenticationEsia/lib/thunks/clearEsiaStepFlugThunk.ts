import { clearContactsEsiaFlag } from 'entities/contacts';
import { clearDriverEsiaFlag } from 'entities/drivers';
import { clearInsurerEsiaFlag } from 'entities/insurer';
import { clearOwnerEsiaFlag } from 'entities/owner';

export const clearEsiaStepFlugThunk = (): ThunkResult<void> => async (dispatch) => {
  dispatch(clearContactsEsiaFlag());
  dispatch(clearOwnerEsiaFlag());
  dispatch(clearInsurerEsiaFlag());
  dispatch(clearDriverEsiaFlag());
};

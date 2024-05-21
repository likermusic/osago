import { B_VARIANT_VALUE, TEST_ANKETA_CONTACT_NUMBER } from 'shared/config/anketaContactAb';
import { getIsNeededABVariant } from 'shared/lib/getIsNeededABVariant';
import { mapBaseQueryToFrontQuery } from 'shared/lib/localStorageMethods/mapBaseQueryToFrontQuery';
import { tryWriteClientDataToMemory } from 'shared/lib/localStorageMethods/writeClientDataToMemory';

import { analyticsABTestStatisticsSelector } from 'entities/appConfig';

import { collectCalculationQuery } from 'features/CollectQuery';

import { defaultStepperConfigSelector } from '../model/AnketaWidget.selectors';

import { recalculateSteps } from './stepper';

export const submitAnketaThunk =
  (isDialog: boolean | undefined, onFullySubmitCallback: () => void): ThunkResult<void> =>
  async (dispatch, getState) => {
    const query = await dispatch(collectCalculationQuery());
    tryWriteClientDataToMemory(mapBaseQueryToFrontQuery(query));

    const isBVariant = getIsNeededABVariant(
      TEST_ANKETA_CONTACT_NUMBER,
      B_VARIANT_VALUE,
      analyticsABTestStatisticsSelector(getState()),
    );

    // на момент сабмита анкеты нам нужна максимально актуальное состояние шагов, поэтому получаем их тут в момент сабмита
    const { activeStep } = recalculateSteps(defaultStepperConfigSelector(getState()), isBVariant);

    // условие полного сабмита всей анкеты, если после рекалькуляции анкеты следующего шага нет то сабмитим
    if (!isDialog && activeStep?.stepIndex === undefined) {
      onFullySubmitCallback();
    }
  };

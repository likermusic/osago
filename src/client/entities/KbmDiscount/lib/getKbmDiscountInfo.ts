import { getDiscountPercentByKbm } from './getDiscountPercentByKbm';
import { getKbmStatus } from './getKbmStatus';
import { getCircleOffsetByKbm } from './KbmCircle/getCircleOffsetByKbm';

export const getKbmDiscountInfo = (kbm: Nullable<number | undefined>) => {
  const status = getKbmStatus(kbm);
  const discountPercent = kbm && getDiscountPercentByKbm(kbm);

  return {
    circleOffset: kbm && getCircleOffsetByKbm(kbm),
    discountPercent,
    kbm,
    status,
  };
};

import CalculatorImg from 'shared/assets/icons/calculator.svg';
import CatImg from 'shared/assets/icons/cat.svg';
import CoinsImg from 'shared/assets/icons/coins.svg';
import FilesImg from 'shared/assets/icons/files.svg';
import PhoneImg from 'shared/assets/icons/phoneAndCar.svg';
import { BannersWithTimer } from 'shared/ui/BannersWithTimer';

import type { TIcons } from '../../types';

import { loaderContent } from './ShortProlongationLoader.texts';

const ICONS: TIcons = {
  CalculatorImg: <CalculatorImg />,
  CatImg: <CatImg />,
  CoinsImg: <CoinsImg />,
  FilesImg: <FilesImg />,
  PhoneImg: <PhoneImg />,
};

export const ShortProlongationLoader = () => {
  const bannerContent = loaderContent.map((item) => ({
    ...item,
    image: ICONS[item.image],
  }));

  return (
    <BannersWithTimer
      isTimerVisible={false}
      content={bannerContent}
    />
  );
};

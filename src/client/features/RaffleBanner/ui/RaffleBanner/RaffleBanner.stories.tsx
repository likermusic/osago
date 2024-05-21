import type { Meta, StoryObj } from '@storybook/react';

import AwardCarDesktop from 'shared/assets/image/Raffle3/WinCar3.png';
import AwardCarMobile from 'shared/assets/image/Raffle3/WinCar3Mobile.png';

import { RaffleBanner } from './RaffleBanner';

const meta: Meta<typeof RaffleBanner> = {
  component: RaffleBanner,
  title: 'Features/RaffleBanner',
};

export default meta;
type Story = StoryObj<typeof RaffleBanner>;

export const RaffleBannerWithArgs: Story = {
  args: {
    config: {
      textButton: 'Подробнее',
      textTitleDesktop: 'Текст',
      textTitleMobile: 'Текст',
      textSubtitleDesktop: 'Текст',
      textSubtitleMobile: 'Текст',
      imageDesktop: AwardCarDesktop,
      imageMobile: AwardCarMobile,
    },
  },
};

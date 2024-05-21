import type { RouterPages } from 'shared/config/router';

export type TRaffleHowToConfig = {
  scrollToId: string;
  steps: Array<{
    IconComponent: FC;
    linkAtStartOfTitle?: {
      text: string;
      url: RouterPages;
    };
    title: string;
    subtitle: string;
  }>;
};

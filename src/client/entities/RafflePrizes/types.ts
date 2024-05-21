import type { CardProps } from '@sravni/react-design-system/dist/types/components/Card';

export type TConfig = {
  title: string;
  prizes: Array<{
    title: string;
    subtitle: { type: 'text' | 'badge'; value: string };
    img: {
      url: string;
      width: number;
      height: number;
    };
    color: CardProps['color'];
  }>;
};

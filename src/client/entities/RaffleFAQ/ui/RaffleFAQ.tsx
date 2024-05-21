import { Accordion, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { OptimizedPicture } from 'shared/ui/OptimizedPicture';

import faqImg from '../assets/faq.png';

import styles from './RaffleFAQ.module.scss';
import { RaffleFAQTexts } from './RaffleFAQ.texts';

export type TRaffleFAQProps = {
  items: Array<{ title: string; text: string }>;
};

export const RaffleFAQ: FC<TRaffleFAQProps> = ({ items, className }) => {
  const isMobile = useIsMobile();
  return (
    <Space
      size={isMobile ? 16 : 32}
      className={cn(styles.wrapper, className)}
      direction="vertical"
      align="center"
    >
      <Typography.Heading
        level={isMobile ? 2 : 1}
        className="h-text-center"
      >
        {RaffleFAQTexts.title}
      </Typography.Heading>

      <Space
        size={isMobile ? 24 : 40}
        direction={isMobile ? 'column-reverse' : 'horizontal'}
        align={isMobile ? 'center' : 'start'}
        justify="center"
      >
        <OptimizedPicture
          img={faqImg}
          imgClassName={styles.img}
          alt={RaffleFAQTexts.title}
        />
        <Accordion>
          {items.map(({ title, text }) => (
            <Accordion.Item
              key={title}
              title={title}
              className="h-color-D100"
            >
              {text}
            </Accordion.Item>
          ))}
        </Accordion>
      </Space>
    </Space>
  );
};

import { Accordion, Card, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { useAppSelector } from 'shared/lib/redux';

import { seoFaqSelector } from 'entities/metadata';

import styles from './LandingFaq.module.scss';

const { Heading, Text } = Typography;

export const LandingFaq: FC = ({ className }) => {
  const faq = useAppSelector(seoFaqSelector)?.serviceResponseData;
  const isMobile = useIsMobile();

  if (!faq) {
    return null;
  }

  const { title, items } = faq;

  return (
    <Card className={cn(styles.container, className)}>
      <Heading
        level={isMobile ? 2 : 3}
        className="h-color-D80"
      >
        {title || ''}
      </Heading>

      <Accordion separator="divider">
        {items?.map((item) => (
          <Accordion.Item
            key={item?.question}
            title={item?.question}
            className={styles.accordionWrapper}
          >
            <Text
              className="h-color-D80"
              size={14}
              dangerouslySetInnerHTML={{ __html: item?.answer }}
            />
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
};

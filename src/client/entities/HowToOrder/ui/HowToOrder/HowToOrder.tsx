import { Carousel, Space, Typography } from '@sravni/react-design-system';

import { Step } from '../Step/Step';

import { HowToOrderSteps } from './HowToOrder.constants';
import { HowToOrderTexts } from './HowToOrder.texts';

export const HowToOrder: FC = ({ className }) => (
  <Carousel
    className={className}
    title={<Typography.Heading level={4}>{HowToOrderTexts.title}</Typography.Heading>}
  >
    <Space
      justify="space-between"
      size={16}
    >
      {HowToOrderSteps.map((stepConfig) => (
        <Step
          key={stepConfig.text}
          {...stepConfig}
        />
      ))}
    </Space>
  </Carousel>
);

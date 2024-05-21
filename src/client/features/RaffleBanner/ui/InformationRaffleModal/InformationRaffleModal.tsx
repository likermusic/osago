import { UI } from '@sravni/cosago-react-library/lib/components';
import { Accordion, Avatar, Button, Carousel, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { useAppSelector } from 'shared/lib/redux';

import { isWLOtpSelector } from 'entities/whiteLabels';

import { Awards } from '../Awards';

import style from './InformationRaffleModal.module.scss';
import { steps, informationRaffleModalTexts, questions, stepsOtp } from './InformationRaffleModal.texts';

interface IInformationRaffleModal {
  isVisible: boolean;
  onClose: () => void;
}

export const InformationRaffleModal: FC<IInformationRaffleModal> = ({ isVisible, onClose }) => {
  const isMobile = useIsMobile();
  const isWlOtp = useAppSelector(isWLOtpSelector);
  const stepsWithCheck = isWlOtp ? stepsOtp : steps;

  return (
    <UI.Popup
      visible={isVisible}
      closable={!isMobile}
      onClose={onClose}
      className={isWlOtp ? style.wrapperOtp : style.wrapper}
      title={informationRaffleModalTexts.firstBlockText}
    >
      <Space
        direction="vertical"
        size={16}
        className="h-pb-24"
      >
        {stepsWithCheck.map((step, index) => (
          <Space
            className={cn(style.textItemWrapper, 'h-text-left')}
            key={step.description}
          >
            <Avatar
              color="gray"
              size={36}
              className="h-mr-12"
            >
              {index + 1}
            </Avatar>
            <Typography.Text
              size={isMobile ? 14 : 16}
              strong
              className={style.textItem}
            >
              {step.description}
            </Typography.Text>
          </Space>
        ))}
      </Space>

      <Typography.Heading
        level={isMobile ? 4 : 3}
        className={cn(style.header, ' h-text-left')}
      >
        {informationRaffleModalTexts.awards}
      </Typography.Heading>

      {isMobile ? (
        <Carousel>
          <Awards />
        </Carousel>
      ) : (
        <Awards />
      )}

      <Typography.Heading
        level={isMobile ? 4 : 3}
        className={cn(style.header, 'h-mt-16 h-mb-16 h-text-left')}
      >
        {informationRaffleModalTexts.questions}
      </Typography.Heading>

      <Accordion
        background={isWlOtp ? undefined : 'white'}
        padding={false}
      >
        {questions.map(({ title, description }) => (
          <Accordion.Item
            title={title}
            className="h-text-left"
            key="title"
          >
            {description}
          </Accordion.Item>
        ))}
      </Accordion>

      <Button
        variant="primary"
        className="h-mt-32"
        size={isMobile ? 52 : 60}
        block={isMobile}
        onClick={onClose}
      >
        {informationRaffleModalTexts.proceedButton}
      </Button>
    </UI.Popup>
  );
};

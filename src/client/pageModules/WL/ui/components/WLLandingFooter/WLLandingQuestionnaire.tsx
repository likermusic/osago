import { Accordion, Card, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import style from './WLLandingQuestionnaire.module.scss';
import { WLLandingQuestionnaireTexts } from './WLLandingQuestionnaire.texts';

export const WLLandingQuestionnaire = () => {
  const isMobile = useIsMobile();

  return (
    <Space
      direction="vertical"
      align={isMobile ? 'start' : 'center'}
      size={isMobile ? 16 : 32}
    >
      <Typography.Heading
        level={2}
        className={isMobile ? 'h-text-left' : ''}
      >
        {WLLandingQuestionnaireTexts.title}
      </Typography.Heading>

      <Card className={style.card}>
        <Accordion>
          {WLLandingQuestionnaireTexts.questions.map(({ title, description }) => (
            <Accordion.Item
              title={title}
              key={title}
            >
              {description}
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    </Space>
  );
};

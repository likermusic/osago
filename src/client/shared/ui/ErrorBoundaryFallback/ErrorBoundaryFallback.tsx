import { Button, Card, Space, Typography } from '@sravni/react-design-system';
import Router from 'next/router';

import UnExpectedError from '../../assets/icons/UnExpectedError.svg';

import styles from './ErrorBoundaryFallback.module.scss';
import { ErrorBoundaryFallbackTexts } from './ErrorBoundaryFallback.texts';

export const ErrorBoundaryFallback = () => (
  <Space
    direction="vertical"
    className={styles.wrapper}
  >
    <Typography.Heading
      level={3}
      className={styles.heading}
    >
      {ErrorBoundaryFallbackTexts.title}
    </Typography.Heading>

    <Card size={24}>
      <Space
        direction="vertical"
        align="center"
        size={0}
      >
        <UnExpectedError
          width={142}
          className="h-mb-12"
        />
        <Typography.Heading
          className="h-mb-4 h-text-center"
          level={4}
        >
          {ErrorBoundaryFallbackTexts.subTitle}
        </Typography.Heading>
        <Typography.Text
          className="h-mb-16"
          size={14}
        >
          {ErrorBoundaryFallbackTexts.text}
        </Typography.Text>

        <Space
          wrap
          justify="center"
          size={12}
        >
          <Button
            size={52}
            variant="primary"
            className={styles.grow}
            onClick={Router.reload}
          >
            {ErrorBoundaryFallbackTexts.retryBtn}
          </Button>
          <Button
            size={52}
            variant="outlined"
            className={styles.grow}
            onClick={Router.back}
          >
            {ErrorBoundaryFallbackTexts.backBtn}
          </Button>
        </Space>
      </Space>
    </Card>
  </Space>
);

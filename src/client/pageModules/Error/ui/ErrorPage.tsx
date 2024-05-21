import type { NextPageContext } from 'next';
import NextError from 'next/error';
import React from 'react';

import styles from './ErrorPage.module.scss';

interface Props {
  statusCode: number | null | undefined;
}

const CODE_IMAGES = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  404: 'https://www.sravni.ru/f/images/404.png',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  500: 'https://www.sravni.ru/f/images/500.png',
};

type HandledErrorCodes = keyof typeof CODE_IMAGES;

const ErrorImage: React.FC<{ code: HandledErrorCodes }> = (props) => {
  const { code } = props;

  return (
    <div className={styles.error}>
      <img
        className={styles['error-image']}
        src={CODE_IMAGES[code]}
        alt={`error-${code}`}
      />
    </div>
  );
};

const ErrorPage = ({ statusCode }: Props) => {
  if (statusCode && statusCode in CODE_IMAGES) {
    return <ErrorImage code={statusCode as HandledErrorCodes} />;
  }

  return <NextError statusCode={500} />;
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): Props => {
  const statusCode = res?.statusCode || err?.statusCode || null;

  return { statusCode };
};

export default ErrorPage;

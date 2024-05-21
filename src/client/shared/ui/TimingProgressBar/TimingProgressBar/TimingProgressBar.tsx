import { Space } from '@sravni/react-design-system';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ProgressBar } from '../ProgressBar';

import { MAX_MILLI_SECONDS, PROGRESS_CHANGE_DELTA } from './config';

interface ITimingProgressBar {
  text: string;
}

export const TimingProgressBar: FC<ITimingProgressBar> = ({ text, className }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timeout = setInterval(
      () => setPercent((percentValue) => percentValue + PROGRESS_CHANGE_DELTA),
      (MAX_MILLI_SECONDS / 100) * PROGRESS_CHANGE_DELTA,
    );

    return () => clearTimeout(timeout);
  }, []);

  if (typeof window === 'undefined') {
    // Чтоб не падал при серверном рендеринге
    return null;
  }

  return createPortal(
    <Space
      justify="center"
      className={className}
    >
      <ProgressBar
        progressPercent={percent}
        text={text}
      />
    </Space>,
    document.body,
  );
};

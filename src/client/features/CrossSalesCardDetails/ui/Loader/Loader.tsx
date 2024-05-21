import { Alert, Spinner } from '@sravni/react-design-system';
import { Warning, Check } from '@sravni/react-icons';
import cn from 'classnames';
import React from 'react';

import type { CrossTypes } from 'shared/config/cross';
import { IconCenter } from 'shared/ui/IconCenter';

import { LoaderStatuses } from '../../types';

import { getAlertColor, getIconColor } from './lib/getAlertAndIconColor';
import styles from './Loader.module.scss';
import { LoaderTexts } from './Loader.texts';

interface ILoader {
  status: LoaderStatuses;
  type: CrossTypes;
}

export const Loader: FC<ILoader> = ({ className, status, type }) => (
  <Alert
    title={LoaderTexts[type][status].title}
    subtitle={LoaderTexts[type][status].subtitle}
    color={getAlertColor(status)}
    className={cn(styles.container, className)}
    icon={
      <IconCenter
        color={getIconColor(status)}
        size={16}
        shape="circle"
        background="white"
        className="h-mr-12"
      >
        {status === LoaderStatuses.loading && <Spinner size={20} />}
        {status === LoaderStatuses.finished && <Check />}
        {status === LoaderStatuses.error && <Warning />}
      </IconCenter>
    }
  />
);

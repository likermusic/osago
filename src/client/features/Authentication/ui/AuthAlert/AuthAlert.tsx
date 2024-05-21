import React from 'react';

import { AnketaAlert } from 'shared/ui/AnketaAlert';

import { AuthAlertTexts } from './AuthAlert.texts';

export const AuthAlert: FC = () => (
  <AnketaAlert
    title={AuthAlertTexts.title}
    subtitle={AuthAlertTexts.subtitle}
  />
);

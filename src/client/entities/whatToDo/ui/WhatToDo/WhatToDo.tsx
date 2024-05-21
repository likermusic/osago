import { Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React, { useState } from 'react';

import { AllCompanies } from '../../configs';
import { CompanySwitcherDesktop } from '../CompanySwitcherDesktop';
import { CompanySwitcherMobile } from '../CompanySwitcherMobile';
import { DocumentLinks } from '../DocumentLinks';
import { Steps } from '../Steps';

import styles from './WhatToDo.module.scss';
import { WhatToDoTexts } from './WhatToDo.texts';

const { Heading } = Typography;

export const WhatToDo = () => {
  const [companyIndex, setCompanyIndex] = useState(0);
  const isMobile = useIsMobile();
  const CompanySwitcher = isMobile ? CompanySwitcherMobile : CompanySwitcherDesktop;

  return (
    <div className={styles.whatToDoContainer}>
      <Heading
        level={isMobile ? 2 : 3}
        className="h-color-D80"
      >
        {WhatToDoTexts.title}
      </Heading>
      <CompanySwitcher
        className={styles.container}
        companies={AllCompanies}
        activeIndex={companyIndex}
        setActiveIndex={setCompanyIndex}
      />

      <Steps
        className={styles.container}
        isMobile={isMobile}
        company={AllCompanies[companyIndex]}
      />

      <div className={styles.container}>
        <DocumentLinks
          documents={WhatToDoTexts.documentLinks}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

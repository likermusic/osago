import { LogoCarousel as LogoCarouselSravni } from '@sravni/react-shared-components/lib/LogoCarousel';
import React from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { insuranceCompaniesAllSelector } from '../../model/insuranceCompanies.selectors';

export const LandingLogoCarousel: FC = ({ className }) => {
  const companies = useAppSelector(insuranceCompaniesAllSelector);

  return companies.length === 0 ? null : (
    <LogoCarouselSravni
      className={className}
      items={companies}
    />
  );
};

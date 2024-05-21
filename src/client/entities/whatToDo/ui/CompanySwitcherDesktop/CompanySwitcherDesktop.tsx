import { Icon, Space, Tag, Button } from '@sravni/react-design-system';
import { ArrowLeft, ArrowRight } from '@sravni/react-icons';
import React, { useState } from 'react';

import type { IComapny } from '../../configs';

export interface ICompanySwitcher {
  companies: Array<Pick<IComapny, 'name'>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const COMPANIES_TO_SHOW = 5;

export const CompanySwitcherDesktop: FC<ICompanySwitcher> = ({ companies, activeIndex, setActiveIndex, className }) => {
  const [startCompanyIndex, setStartCompanyIndex] = useState(0);

  return (
    <Space
      className={className}
      justify="space-between"
    >
      <Button
        color="gray"
        variant="secondary"
        disabled={startCompanyIndex === 0}
        onClick={() => setStartCompanyIndex((val) => (val > 0 ? val - 1 : val))}
      >
        <Icon
          color="gray"
          icon={<ArrowLeft />}
        />
      </Button>
      {companies.slice(startCompanyIndex, startCompanyIndex + COMPANIES_TO_SHOW).map(({ name }, idx) => (
        <Tag
          key={name}
          active={activeIndex === idx + startCompanyIndex}
          onClick={() => setActiveIndex(idx + startCompanyIndex)}
        >
          {name}
        </Tag>
      ))}
      <Button
        color="gray"
        variant="secondary"
        disabled={startCompanyIndex === companies.length - COMPANIES_TO_SHOW}
        onClick={() => setStartCompanyIndex((val) => (val < companies.length - COMPANIES_TO_SHOW ? val + 1 : val))}
      >
        <Icon
          color="gray"
          icon={<ArrowRight />}
        />
      </Button>
    </Space>
  );
};

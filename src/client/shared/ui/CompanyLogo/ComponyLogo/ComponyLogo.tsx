import { Avatar, Space } from '@sravni/react-design-system';

type ICompanyLogoProps = {
  companyName: string;
  companyIconUrl: string;
};

export const CompanyLogo: FC<ICompanyLogoProps> = ({ className, companyName, companyIconUrl }) => (
  <Space
    size={12}
    className={className}
    align="center"
  >
    <Avatar
      size={44}
      src={companyIconUrl}
    />

    {companyName}
  </Space>
);

import { Space, Typography } from '@sravni/react-design-system';

interface ITotalKbmDiscountProps {
  title: string;
  subtitle?: string;
  coeff: string;
  coeffSubtitle?: string;
}

export const TotalKbmDiscount: FC<ITotalKbmDiscountProps> = ({ title, subtitle, coeff, coeffSubtitle, className }) => (
  <Space
    className={className}
    justify="space-between"
    align="center"
    size={16}
  >
    <Space direction="vertical">
      <Typography.Text
        size={16}
        strong
      >
        {title}
      </Typography.Text>
      {subtitle && (
        <Typography.Text
          size={12}
          className="h-color-D60"
        >
          {subtitle}
        </Typography.Text>
      )}
    </Space>
    <Space
      direction="vertical"
      align="end"
    >
      <Typography.Text size={12}>{coeff}</Typography.Text>
      {coeffSubtitle && (
        <Typography.Heading
          level={4}
          className="h-mt-2 h-text-left"
        >
          {coeffSubtitle}
        </Typography.Heading>
      )}
    </Space>
  </Space>
);

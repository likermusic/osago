import { Typography, Space } from '@sravni/react-design-system';
import type { SpaceProps } from '@sravni/react-design-system/dist/types/components/Space';

interface TitleWithDescriptionProps {
  title: string;
  description?: string | JSX.Element;
  titleLevel?: 'text' | Typography.HeadingProps['level'];
  verticalGap?: SpaceProps['size'];
  justify?: SpaceProps['justify'];
  align?: SpaceProps['align'];
  className?: string;
  descriptionSize?: Typography.TextProps['size'];
}

export const TitleWithDescription: FC<TitleWithDescriptionProps> = ({
  align,
  justify,
  description,
  titleLevel = 4,
  title,
  verticalGap = 2,
  className,
  descriptionSize,
}) => (
  <Space
    justify={justify}
    align={align}
    direction="vertical"
    size={verticalGap}
    className={className}
  >
    {titleLevel === 'text' ? (
      <Typography.Text strong>{title}</Typography.Text>
    ) : (
      <Typography.Heading level={titleLevel}>{title}</Typography.Heading>
    )}

    {description && <Typography.Text size={descriptionSize}>{description}</Typography.Text>}
  </Space>
);

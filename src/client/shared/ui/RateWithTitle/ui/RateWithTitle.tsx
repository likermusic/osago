import { Space, Rate, Typography } from '@sravni/react-design-system';
import type { SpaceProps } from '@sravni/react-design-system/dist/types/components/Space';
import type { RateProps } from '@sravni/react-design-system/lib/Rate';
import type { TextProps } from '@sravni/react-design-system/lib/Typography';
import type { ReactNode } from 'react';

interface IRateWithTitle extends RateProps {
  // We get these props from Space(design-system)
  spaceProps?: SpaceProps;
  // We get these props from Typography.Text (design-system)
  textProps?: TextProps;
  // Текст рядом с рейтингом
  children: ReactNode;
}
export const RateWithTitle: FC<IRateWithTitle> = ({
  className,
  children,
  spaceProps = {},
  textProps = {},
  ...rateProps
}) => {
  const { size: sizeText = 12, ...restTextProps } = textProps;
  const { size: sizeSpace = 4, align = 'center', ...restSpaceProps } = spaceProps;
  const { disabled: isDisabled = true, ...restRateProps } = rateProps;

  return (
    <Space
      {...restSpaceProps}
      size={sizeSpace}
      align={align}
      className={className}
    >
      <Typography.Text
        {...restTextProps}
        size={sizeText}
      >
        {children}
      </Typography.Text>
      <Rate
        {...restRateProps}
        disabled={isDisabled}
      />
    </Space>
  );
};

import { Alert, Icon, Typography } from '@sravni/react-design-system';
import type { AlertProps } from '@sravni/react-design-system/dist/types/components/Alert';
import { useIsMobile } from '@sravni/react-utils';

export const CommonAlert: FC<AlertProps> = ({ className, color, title, subtitle, icon }) => {
  const isMobile = useIsMobile();
  return (
    <Alert
      className={className}
      color={color}
      title={<Typography.Text size={isMobile ? 14 : 16}>{title}</Typography.Text>}
      subtitle={
        <Typography.Text
          className="h-color-D60 h-mt-2"
          size={12}
        >
          {subtitle}
        </Typography.Text>
      }
      icon={
        <Icon
          background="white"
          color="green"
          size={16}
        >
          {icon}
        </Icon>
      }
    />
  );
};

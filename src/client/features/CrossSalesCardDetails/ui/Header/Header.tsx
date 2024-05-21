import { Avatar, Button, Icon, Space, Typography } from '@sravni/react-design-system';
import { Cross } from '@sravni/react-icons';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import styles from './Header.module.scss';

const { Heading, Text } = Typography;

interface IHeader {
  avatarSrc: string;
  onCrossButtonClick: () => void;
  subtitle: string;
  title: string;
}

export const Header: FC<IHeader> = ({ avatarSrc, className, onCrossButtonClick, subtitle, title }) => {
  const isMobile = useIsMobile();
  return (
    <Space
      className={cn(className, styles.container)}
      justify="space-between"
      align="center"
    >
      <Space size={12}>
        <Avatar
          size={isMobile ? 36 : 52}
          src={avatarSrc}
        />
        <Space
          direction="vertical"
          size={2}
        >
          <Heading
            level={3}
            className="h-mb-2"
          >
            {title}
          </Heading>
          <Text
            size={12}
            className="h-color-D60"
          >
            {subtitle}
          </Text>
        </Space>
      </Space>

      <Button
        onClick={onCrossButtonClick}
        variant="text"
        className={cn(styles.closeButton, 'h-color-D30')}
      >
        <Icon size={20}>
          <Cross />
        </Icon>
      </Button>
    </Space>
  );
};

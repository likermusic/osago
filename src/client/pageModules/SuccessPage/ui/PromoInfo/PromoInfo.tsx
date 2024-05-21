import { Alert, Button, Card, Icon, Space, Typography } from '@sravni/react-design-system';
import { MyCredits } from '@sravni/react-icons';
import { useBoolean, useIsMobile } from '@sravni/react-utils';

import { AppLinks } from 'shared/ui/AppLinks';

import { PromoInfoTexts } from './PromoInfo.texts';

const { Text } = Typography;

interface IPromoInfo {
  title: string;
  subtitle: string;
  withAppLinks?: boolean;
}

export const PromoInfo: FC<IPromoInfo> = ({ className, title, subtitle, withAppLinks }) => {
  const isMobile = useIsMobile();
  const [isAppLinksShown, setAppLinksShown] = useBoolean();

  return withAppLinks ? (
    <>
      <Card
        className={className}
        size={isMobile ? 16 : 24}
      >
        <Space
          justify="space-between"
          align="center"
          wrap={isMobile}
        >
          <Space
            align="start"
            className="h-mr-32"
          >
            <Icon
              className="h-mr-12"
              color="green"
              size={20}
            >
              <MyCredits />
            </Icon>

            <Space
              direction="vertical"
              size={2}
            >
              <Text
                size={16}
                strong
              >
                {title}
              </Text>
              <Text
                size={12}
                className="h-color-D60"
              >
                {subtitle}
              </Text>
            </Space>
          </Space>

          <Button
            className={isMobile ? 'h-mt-20' : ''}
            color="blue"
            onClick={setAppLinksShown.on}
            variant="secondary"
            block={isMobile}
          >
            {PromoInfoTexts.withAppLinks.button}
          </Button>
        </Space>
      </Card>

      <AppLinks
        visible={isAppLinksShown}
        handleClose={setAppLinksShown.off}
      />
    </>
  ) : (
    <Alert
      className={className}
      color="green"
      icon={
        <Icon
          color="green"
          background="white"
          size={16}
        >
          <MyCredits />
        </Icon>
      }
      title={PromoInfoTexts.alert.title}
      subtitle={PromoInfoTexts.alert.subtitle}
    />
  );
};

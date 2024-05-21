import { Button, NotificationManager, Space, Typography } from '@sravni/react-design-system';
import { useBoolean, useIsMobile } from '@sravni/react-utils';

import { formatPrice } from 'shared/lib/formatters';
import { generateOldOsagoUrl } from 'shared/lib/OSAGOv1';

import { clearCache } from '../../lib/clearCache';

import { RedirectOnOrderPageTexts } from './RedirectOnOrderPage.texts';

type IRedirectOnOrderPageProps = {
  price: number | undefined;
  orderHash: string;
};

export const RedirectOnOrderPage: FC<IRedirectOnOrderPageProps> = ({ price, orderHash }) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useBoolean();

  const handleOnClick = async () => {
    setIsLoading.on();
    const isSuccess = await clearCache(orderHash);
    if (isSuccess) {
      window.location.replace(generateOldOsagoUrl(`?orderHash=${orderHash}&co=true`));
    } else {
      NotificationManager.show(RedirectOnOrderPageTexts.error, '', '', 5000, 'error');
    }
    setIsLoading.off();
  };

  return (
    <Space
      align="center"
      justify={isMobile ? 'space-between' : 'end'}
    >
      {!!price && (
        <Typography.Heading
          level={isMobile ? 3 : 4}
          className="h-mr-12"
        >
          {formatPrice(price)}
        </Typography.Heading>
      )}

      <Button
        variant="primary"
        onClick={handleOnClick}
        loading={isLoading}
      >
        {RedirectOnOrderPageTexts.buttonTitle}
      </Button>
    </Space>
  );
};

import { UI } from '@sravni/cosago-react-library/lib/components';
import { Alert, Button, Icon, Space, Typography } from '@sravni/react-design-system';
import { ArrowLeft, MoneyCoins } from '@sravni/react-icons';
import { useIsMobile } from '@sravni/react-utils';
import { Fragment } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { promocodeAlertsSelector } from 'entities/propositionCalculations';

import { PromocodeTexts } from '../../lib/Promocode.texts';

const { Link } = Typography;

interface IPromocodeAppliedProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PromocodeAppliedModal: FC<IPromocodeAppliedProps> = ({ isVisible, onClose, className }) => {
  const isMobile = useIsMobile();

  const promocodeAlerts = useAppSelector(promocodeAlertsSelector);

  return (
    <UI.Popup
      className={className}
      visible={isVisible}
      onClose={onClose}
      title={PromocodeTexts.modalTitleApplied}
    >
      {promocodeAlerts.map((alert) => (
        <Fragment key={alert.title}>
          <Space
            className="h-mb-8"
            direction="vertical"
            size={16}
          >
            <Alert
              className="h-text-left"
              color={alert.color}
              icon={
                <Icon
                  background="white"
                  color="green"
                  size={16}
                >
                  <MoneyCoins />
                </Icon>
              }
              title={alert.title}
              subtitle={alert.subtitle}
            />
          </Space>
          {alert.url && (
            <Link
              className="h-ml-8"
              href={alert.url}
              target="_blank"
            >
              {PromocodeTexts.linkRuleLbl}
            </Link>
          )}
        </Fragment>
      ))}

      <Space
        className="h-mt-32 h-mb-8"
        justify="center"
      >
        <Button
          block={isMobile}
          onClick={onClose}
          size={52}
          variant="primary"
        >
          <Icon icon={<ArrowLeft />} />
          {PromocodeTexts.backBtnText}
        </Button>
      </Space>
    </UI.Popup>
  );
};

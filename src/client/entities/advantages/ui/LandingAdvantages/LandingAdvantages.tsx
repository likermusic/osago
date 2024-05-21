import { Space } from '@sravni/react-design-system';
import { Percent, ShieldSafety } from '@sravni/react-icons';
import { useIsMobile } from '@sravni/react-utils';

import { OptimizedPicture } from 'shared/ui/OptimizedPicture';

import HappyPeopleWithCar from '../assets/happyPeopleWithCar.png';
import imgEconomy from '../assets/imgEconomy.png';
import Insurances from '../assets/insurances.svg';
import InsurancesWl from '../assets/insurancesWL.svg';
import { Economy } from '../Economy/Economy';
import { Option } from '../Option/Option';

import styles from './LandingAdvantages.module.scss';
import { landingAdvantagesTexts } from './LandingAdvantages.texts';

const { discounts, economy, noCommission, reliable } = landingAdvantagesTexts;

interface OptionsProps {
  showNoCommission: boolean;
  isWL: boolean;
}

export const LandingAdvantages: FC<OptionsProps> = ({ showNoCommission, isWL }) => {
  const isMobile = useIsMobile();

  return (
    <Space
      direction="vertical"
      className={styles.landingWrapper}
    >
      {showNoCommission && (
        <Option
          title={noCommission.caption}
          description={noCommission.description}
          isHorizontal={!isMobile}
          className={styles.noComission}
          titleLevel={3}
          isWL={isWL}
        >
          {!isMobile && (
            <div className={styles.companiesLogoWrapper}>
              {isWL ? (
                <InsurancesWl className={styles.companiesLogo} />
              ) : (
                <Insurances className={styles.companiesLogo} />
              )}
            </div>
          )}
        </Option>
      )}

      <Space
        size={isMobile ? 16 : 32}
        direction={isMobile ? 'vertical' : 'horizontal'}
      >
        <Economy
          className={styles.carWithDriverWrapper}
          title={economy.caption}
          description={economy.description}
        >
          {!isMobile && (
            <OptimizedPicture
              img={isWL ? imgEconomy : HappyPeopleWithCar}
              alt={economy.economyImgAlt}
              imgClassName={isWL ? styles.imgWl : styles.img}
              height={285}
              isJpeg
            />
          )}
        </Economy>

        <Space
          size={isMobile ? 16 : 32}
          direction="vertical"
          justify="space-between"
          className={styles.rightContainer}
        >
          <Option
            title={discounts.caption}
            description={discounts.description}
            reverse
            titleWithIcon
            className={styles.rightOption}
            isWL={isWL}
            IconElement={isMobile ? undefined : Percent}
          />

          <Option
            title={reliable.caption}
            description={reliable.description}
            reverse
            titleWithIcon
            className={styles.rightOption}
            isWL={isWL}
            IconElement={isMobile ? undefined : ShieldSafety}
          />
        </Space>
      </Space>
    </Space>
  );
};

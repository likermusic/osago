import { Button, Icon, Space } from '@sravni/react-design-system';
import { Calculations } from '@sravni/react-icons';
import { useBoolean, useIsMobile } from '@sravni/react-utils';

import { useAppSelector } from 'shared/lib/redux';
import { usePropositionPageScroll } from 'shared/lib/usePageScroll';

import { policiesDraftsUrlsSelector } from '../../model/policyDraft.selectors';
import { PolicyPopup } from '../PolicyPopup/PolicyPopup';

import { PoliciesDraftsTexts } from './PoliciesDrafts.texts';

export const PoliciesDrafts: FC = ({ className }) => {
  const isMobile = useIsMobile();
  const { upsaleUrl, policyUrl } = useAppSelector(policiesDraftsUrlsSelector);

  const [isPolicyDraftVisible, setPolicyDraftVisible] = useBoolean(false);

  const [isUpsaleDraftVisible, setUpsaleDraftVisible] = useBoolean(false);

  const { navigateToAnketa } = usePropositionPageScroll();

  const closeOpenedPopup = () => {
    if (isPolicyDraftVisible) setPolicyDraftVisible.off();
    else if (isUpsaleDraftVisible) setUpsaleDraftVisible.off();
  };

  const onChangeBtnClick = () => {
    closeOpenedPopup();
    navigateToAnketa();
  };

  const PolicyPopupControls = (
    <Space justify={isMobile ? 'space-between' : 'end'}>
      <Button onClick={onChangeBtnClick}>{PoliciesDraftsTexts.changeBtn}</Button>
      <Button
        variant="primary"
        onClick={closeOpenedPopup}
        className="h-ml-20"
      >
        {PoliciesDraftsTexts.acceptBtn}
      </Button>
    </Space>
  );

  const handlePolicyDraftOpen = () => {
    setPolicyDraftVisible.on();

    // TODO: разобраться с аналитикой https://sravni-corp.atlassian.net/browse/OS-7657
    // sendEventPolicyDraft({
    //   companyName: company.companyName,
    //   isProlongation,
    //   propositionType: saleType,
    // });
  };

  return (
    <>
      <Space
        className={className}
        size={12}
        direction={isMobile ? 'vertical' : 'horizontal'}
      >
        <Button
          block
          color="gray"
          onClick={handlePolicyDraftOpen}
          disabled={!policyUrl}
          variant="outlined"
          className="h-mb-12"
        >
          <Icon
            icon={<Calculations />}
            strong
          />

          {PoliciesDraftsTexts.buttonPolicy}
        </Button>

        {upsaleUrl && (
          <Button
            block
            color="gray"
            onClick={setUpsaleDraftVisible.on}
            variant="outlined"
            className="h-mb-12"
          >
            <Icon
              icon={<Calculations />}
              strong
            />

            {PoliciesDraftsTexts.buttonUpsale}
          </Button>
        )}
      </Space>

      <PolicyPopup
        title={PoliciesDraftsTexts.buttonPolicy}
        isVisible={isPolicyDraftVisible}
        policyHref={policyUrl || ''}
        onClose={setPolicyDraftVisible.off}
      >
        {PolicyPopupControls}
      </PolicyPopup>

      <PolicyPopup
        title={PoliciesDraftsTexts.buttonUpsale}
        isVisible={isUpsaleDraftVisible}
        policyHref={upsaleUrl || ''}
        onClose={setUpsaleDraftVisible.off}
      >
        {PolicyPopupControls}
      </PolicyPopup>
    </>
  );
};

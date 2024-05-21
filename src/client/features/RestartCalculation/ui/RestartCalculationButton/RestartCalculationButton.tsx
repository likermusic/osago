import { Button } from '@sravni/react-design-system';
import type { ButtonProps } from '@sravni/react-design-system/lib/Button';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { useAppDispatch } from 'shared/lib/redux';
import { usePropositionPageScroll } from 'shared/lib/usePageScroll';

import { resetPropositionCalculation, setPropositionStatus, useNewCalculation } from 'entities/propositionCalculations';

import { RestartCalculationButtonTexts } from './RestartCalculationButton.texts';

interface IRestartCalculationButton extends ButtonProps {
  getQuery: () => ThunkResult<Promise<PropositionCalculations.GetCalculationsHashQuery>>;
  btnText?: string;
}

export const RestartCalculationButton: FC<IRestartCalculationButton> = ({
  className,
  getQuery,
  btnText = RestartCalculationButtonTexts.btnText,
  ...rest
}) => {
  const requestCalculationHash = useNewCalculation(getQuery);
  const dispatch = useAppDispatch();
  const { navigateToPropositionList } = usePropositionPageScroll();

  const onClick = async () => {
    navigateToPropositionList();
    dispatch(resetPropositionCalculation());
    dispatch(setPropositionStatus('loading'));

    await requestCalculationHash(true);
  };

  return (
    <Button
      {...rest}
      className={className}
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
};

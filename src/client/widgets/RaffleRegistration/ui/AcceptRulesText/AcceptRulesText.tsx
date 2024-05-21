import { Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { ChoosePolicyStepTexts } from '../ChoosePolicyStep/ChoosePolicyStep.texts';

type TAcceptRulesTextProps = {
  rulesLink: string;
  btnName: string;
};

export const AcceptRulesText: FC<TAcceptRulesTextProps> = ({ rulesLink, btnName }) => {
  const isMobile = useIsMobile();

  return (
    <Typography.Text
      size={10}
      className={cn('h-color-D60', { 'h-text-center': isMobile })}
    >
      {ChoosePolicyStepTexts.rules.getFirstText(btnName)}
      <Typography.Link
        href={rulesLink}
        target="_blank"
      >
        {ChoosePolicyStepTexts.rules.link}
      </Typography.Link>
      {ChoosePolicyStepTexts.rules.secondText}
    </Typography.Text>
  );
};

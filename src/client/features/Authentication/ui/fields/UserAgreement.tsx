import { UI } from '@sravni/cosago-react-library/lib/components';
import { Typography } from '@sravni/react-design-system';

import type { FieldFactoryProps } from 'types/fieldFactory';

import { fileLinks } from 'shared/config/fileLinks';

import { userAgreementText } from '../FormBody/FormBody.texts';

export const UserAgreement: FC<FieldFactoryProps> = (props) => {
  const { type } = props;

  return (
    <UI.ControlledCheckbox
      {...props}
      name={type}
    >
      <Typography.Text>
        {userAgreementText.text}

        <Typography.Link
          href={fileLinks.userAgreement}
          target="_blank"
        >
          {userAgreementText.link}
        </Typography.Link>
      </Typography.Text>
    </UI.ControlledCheckbox>
  );
};

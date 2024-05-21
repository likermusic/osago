import { UI } from '@sravni/cosago-react-library/lib/components';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type { ICustomSelectValue, IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import type { FC } from 'react';
import { useEffect, useMemo } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { selectDrivers } from 'entities/drivers';
import type { OwnerCommonFields } from 'entities/owner';
import { PolicyHolderType } from 'entities/owner';

import { mapPolicyHolderList } from '../../lib/mapPolicyHolderList';

const SHOULD_UPDATE_POLICY_HOLDER_TYPE = [PolicyHolderType.Default, PolicyHolderType.Owner];

export const PolicyHolder: FC<IFieldFactoryProps> = (props) => {
  const { type, label, isMobileFlow } = props;
  const { watch, setValue } = useFormContext<OwnerCommonFields>();
  const ownerName = watch('fullName.label');
  const policyHolder = watch('policyHolder');
  const { multipleFormsData } = useAppSelector(selectDrivers);

  const options = useMemo(() => mapPolicyHolderList(multipleFormsData, ownerName), [ownerName, multipleFormsData]);

  useEffect(() => {
    const currentOwner = options.find((option) => option.label === ownerName);

    // если дефолтное значение или собственник, то подставляем актуальное имя в поле
    if (currentOwner && SHOULD_UPDATE_POLICY_HOLDER_TYPE.includes(policyHolder as string as PolicyHolderType)) {
      setValue('policyHolder', currentOwner.value);
    }

    // Должен срабатывать только на изменение имени в форме
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerName]);

  return isMobileFlow ? (
    <UI.ControlledMobileRadioGroup
      options={options}
      name={type}
      transformInput={(value: string) => (value ? { value } : null)}
      transformOutput={(option: Nullable<ICustomSelectValue>) => option?.value || ''}
    />
  ) : (
    <UI.ControlledSelect
      name={type}
      label={label}
      options={options}
    />
  );
};

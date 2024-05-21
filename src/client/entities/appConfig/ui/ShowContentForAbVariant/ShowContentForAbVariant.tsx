import type { TExperimentLabel, TOneOfVariant } from '../../config';
import { useAbTestVariant } from '../../lib';

type TShowContentForAbVariant<T extends TExperimentLabel> = {
  expectedVariants: Record<TOneOfVariant<T>, Nullable<JSX.Element>>;
  defaultVariant?: TOneOfVariant<T>;
  experimentName: TExperimentLabel;
};

export function ShowContentForAbVariant<T extends TExperimentLabel>({
  expectedVariants,
  defaultVariant = '0',
  experimentName,
}: TShowContentForAbVariant<T>) {
  const currentVariant = useAbTestVariant<TOneOfVariant<T>>(experimentName);

  const Component = currentVariant ? expectedVariants[currentVariant] : expectedVariants[defaultVariant];

  return Component ?? null;
}

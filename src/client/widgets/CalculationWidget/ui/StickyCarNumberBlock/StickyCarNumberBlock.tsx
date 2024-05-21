import { Transition, Card, Portal } from '@sravni/react-design-system';

import type { FlowType } from 'shared/config/FlowType';

import type { CarNumberLandingFormFields } from 'entities/carInfo';

import { CarNumberBlock } from '../CarNumberBlock';

import styles from './StickyCarNumberBlock.module.scss';

interface StickyCarNumberBlockProps {
  flowType: FlowType;
  changeFlowType: (value: FlowType) => void;
  onClick: () => void;
  onSubmitCallback: (values: CarNumberLandingFormFields) => void;
}

export const StickyCarNumberBlock: FC<StickyCarNumberBlockProps> = ({
  flowType,
  changeFlowType,
  onClick,
  onSubmitCallback,
}) => (
  <Portal>
    <div className={styles.stickyControl}>
      <Transition.SlideFade
        visible
        transition={{ duration: 2, type: 'keyframes' }}
      >
        <Card
          size={16}
          className={styles.stickyControlContent}
          onClick={onClick}
        >
          <CarNumberBlock
            isSticky
            flowType={flowType}
            changeFlowType={changeFlowType}
            onSubmitCallback={onSubmitCallback}
          />
        </Card>
      </Transition.SlideFade>
    </div>
  </Portal>
);

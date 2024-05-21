import { selectIsPossibleToAddDriver, selectMultiDrive } from 'entities/drivers';

export const selectShouldShowAddMoreBtn =
  (multipartFormId: string, isCurrentDriverFullFilled: boolean, isSummary: boolean | undefined) => (state: Store) => {
    const isPossibleToAdd = selectIsPossibleToAddDriver(multipartFormId)(state);
    const isMultiDrive = selectMultiDrive(state);

    return isCurrentDriverFullFilled && isPossibleToAdd && !isMultiDrive && !isSummary;
  };

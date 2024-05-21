export type IRestorationData = {
  type: 'LOCAL_STORAGE';
  payload: {
    carNumber: string;
  };
};

export type TSubscriptionCallback = (restoration: IRestorationData) => void;

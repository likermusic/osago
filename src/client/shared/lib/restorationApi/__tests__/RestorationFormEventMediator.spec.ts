import { RestorationFormEventMediator } from 'shared/lib';

describe('WHEN "RestorationFormEventMediator" is created', () => {
  const callback = jest.fn();
  const restorationParams = {
    type: 'LOCAL_STORAGE',
    payload: { carNumber: 'c911tt33' },
  } as const;

  const mediator = new RestorationFormEventMediator(callback);

  it('WHEN client code fire event and it is not restoration event MUST do nothing', () => {
    RestorationFormEventMediator.generateEvent(restorationParams);

    expect(callback).not.toHaveBeenCalled();
  });

  describe('WHEN client code fire event and it is restoration event', () => {
    it('AND mediator was subscribed on event, MUST call provided callback', () => {
      mediator.subscribeOnRestoration();
      RestorationFormEventMediator.generateEvent(restorationParams);

      expect(callback).toHaveBeenCalledWith(restorationParams);
      mediator.unsubscribeOnRestoration();
    });

    it('AND mediator was unsubscribed on event, MUST do nothing', () => {
      mediator.subscribeOnRestoration();
      mediator.unsubscribeOnRestoration();

      RestorationFormEventMediator.generateEvent(restorationParams);

      expect(callback).not.toHaveBeenCalled();
    });
  });
});

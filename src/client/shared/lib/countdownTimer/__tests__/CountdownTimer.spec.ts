import addSeconds from 'date-fns/addSeconds';

import { CountdownTimer } from '../countdownTimer';

describe('WHEN "CountdownTimer" is created', () => {
  describe('AND "start" was called', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    const timerCallback = jest.fn();

    it('MUST decrease timer value each minute', () => {
      const seconds = 120;
      const timer = new CountdownTimer(addSeconds(new Date(), seconds));

      expect(timer.currentTimeSec).toEqual(seconds);
      timer.start(timerCallback);
      jest.runAllTimers();
      expect(timerCallback).toHaveBeenCalledTimes(2);
    });

    it('MUST stop counting when timer achieved 0', () => {
      const seconds = 60;
      const timer = new CountdownTimer(addSeconds(new Date(), seconds));

      expect(timer.currentTimeSec).toEqual(seconds);
      timer.start(timerCallback);
      jest.runAllTimers();
      expect(timer.currentTimeSec).toEqual(0);
    });
  });

  it('AND "timeLeft" was called, MUST return rest of time, divided by days, hours, seconds', () => {
    const days = 1;
    const hours = 2;
    const minutes = 30;

    const seconds = CountdownTimer.DAY * days + CountdownTimer.HOUR * hours + CountdownTimer.MIN * minutes + 20;
    const timer = new CountdownTimer(addSeconds(new Date(), seconds));

    expect(timer.timeLeft()).toEqual({
      days,
      hours,
      minutes,
    });
  });
});

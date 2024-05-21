import differenceInSeconds from 'date-fns/differenceInSeconds';

export class CountdownTimer {
  static SEC = 1;
  static MIN = CountdownTimer.SEC * 60;
  static HOUR = CountdownTimer.MIN * 60;
  static DAY = CountdownTimer.HOUR * 24;

  currentTimeSec: number | null;
  private currentTimer: number | null = 0;
  private readonly delay: number;
  private readonly decrease: number;

  constructor(private threshold: Date, iterateEach: 'sec' | 'min' = 'sec') {
    this.currentTimeSec = differenceInSeconds(threshold, new Date());
    const { delay, decrease } = this._iterateConfig(iterateEach);
    this.delay = delay;
    this.decrease = decrease;
  }

  start(callback: () => void): void {
    if (this.currentTimer || !this.currentTimeSec) {
      return;
    }

    this.currentTimer = window.setTimeout(() => {
      this.currentTimer = 0;
      const currentTimeSec = differenceInSeconds(this.threshold, new Date());

      if (this.currentTimeSec && this.currentTimeSec - currentTimeSec >= this.decrease) {
        this.currentTimeSec = currentTimeSec;
        callback();
      }

      this.start(callback);
    }, this.delay);
  }

  timeLeft(): { days: number; hours: number; minutes: number } {
    const result = {
      days: 0,
      hours: 0,
      minutes: 0,
    };

    if (this.currentTimeSec) {
      const fullDays = Math.floor(this.currentTimeSec / CountdownTimer.DAY);

      let restSeconds = this.currentTimeSec - CountdownTimer.DAY * fullDays;

      const fullHours = Math.floor(restSeconds / CountdownTimer.HOUR);
      restSeconds -= CountdownTimer.HOUR * fullHours;
      const fullMinutes = Math.floor(restSeconds / CountdownTimer.MIN);

      result.days = fullDays;
      result.hours = fullHours;
      result.minutes = fullMinutes;
    }

    return result;
  }

  _iterateConfig(iterateEach: 'sec' | 'min'): {
    decrease: number;
    delay: number;
  } {
    if (iterateEach === 'sec') {
      return {
        delay: CountdownTimer.SEC * 1000,
        decrease: 60,
      };
    }

    return {
      delay: CountdownTimer.MIN * 1000,
      decrease: 60,
    };
  }

  remove() {
    this.currentTimeSec = null;
    this.currentTimer = null;
  }
}

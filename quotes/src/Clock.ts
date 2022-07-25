namespace ClockTicker {
  interface Clocker {
    timeElement: HTMLTimeElement;
    intervalNumber: number;
    isRun: boolean;
  }

  class ClockTickerW implements Clocker {
    timeElement: HTMLTimeElement;
    isRun: boolean;
    intervalNumber: number;

    constructor(element: HTMLTimeElement) {
      this.timeElement = element;
      this.isRun = false;
      this.intervalNumber = 0;
    }

    public static queryTimeElement(
      selector: string
    ): HTMLTimeElement | undefined {
      if (!selector) {
        return undefined;
      }

      return (document.querySelector(selector) as HTMLTimeElement) || undefined;
    }

    public startClock(): boolean {
      if (!this.timeElement) {
        throw Error("Not valid time element ! clock start failed");
      }

      this.intervalNumber = setInterval(this.updateClock.bind(this), 1000);
      this.isRun = true;
      return true;
    }

    public stopClock(): boolean {
      if (!this.isRun || !this.intervalNumber) {
        return false;
      }

      this.isRun = false;
      clearInterval(this.intervalNumber);
      return true;
    }

    private updateClock(): void {
      if (!this.isRun) {
        return;
      }

      let timeEle = this.timeElement;
      let timeStr = "";
      {
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        timeStr = `${hour}:${minute}:${second}`;
      }
      timeEle.innerText = timeStr;
    }
  }

  export function initClocker(selectorString: string): boolean {
    if (!selectorString) {
      throw Error("selector empty!");
    }

    let timeEle = ClockTickerW.queryTimeElement(selectorString);
    if (timeEle === undefined) {
      return false;
    }

    let myClock = new ClockTickerW(timeEle);
    myClock.startClock();
    return true;
  }
}

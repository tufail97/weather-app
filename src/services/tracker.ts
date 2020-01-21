import { IWeatherResponse, IWeatherState, IList } from 'interfaces';

interface IReturn {
  day: number;
  night: number;
  humidity: number;
}

// tracker class
export default class Tracker {
  private values: IWeatherResponse = {};

  setValue = (_value: IWeatherState) => {
    if (_value.weather) {
      this.values = _value.weather;
    }
  };

  // return the minimun of recorded values
  getMin = (): IReturn | null => {
    let day = 0;
    let night = 0;
    let humidity = 0;
    if (this.values.list) {
      this.values.list.forEach((e: IList, index: number): void => {
        if (index === 0) {
          day = e.temp.day;
          night = e.temp.night;
          humidity = e.humidity;
        } else {
          if (e.temp.day < day) {
            day = e.temp.day;
          }

          if (e.temp.night < night) {
            night = e.temp.night;
          }

          if (e.humidity < humidity) {
            humidity = e.humidity;
          }
        }
      });

      return {
        day: day,
        night: night,
        humidity: humidity
      };
    }

    return null;
  };

  // return the minimun of recorded values
  getMax = (): IReturn | null => {
    let day = 0;
    let night = 0;
    let humidity = 0;
    if (this.values.list) {
      this.values.list.forEach((e: IList, index: number): void => {
        if (index === 0) {
          day = e.temp.day;
          night = e.temp.night;
          humidity = e.humidity;
        } else {
          if (e.temp.day > day) {
            day = e.temp.day;
          }

          if (e.temp.night > night) {
            night = e.temp.night;
          }

          if (e.humidity > humidity) {
            humidity = e.humidity;
          }
        }
      });

      return {
        day: day,
        night: night,
        humidity: humidity
      };
    }

    return null;
  };

  // return the mean of recorded values
  getMean = (): IReturn | null => {
    let day = 0;
    let night = 0;
    let humidity = 0;
    if (this.values.list) {
      this.values.list.forEach((e: IList): void => {
        day += e.temp.day;
        night += e.temp.night;
        humidity += e.humidity;
      });

      return {
        day: Number((day / this.values.list.length).toFixed(2)),
        night: Number((night / this.values.list.length).toFixed(2)),
        humidity: Number((humidity / this.values.list.length).toFixed(2))
      };
    }

    return null;
  };

  // ref https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
  calculateMode = (numbers: Array<number>): number => {
    let numMapping: any = {};
    let greatestFreq = 0;
    let mode;

    numbers.forEach(number => {
      numMapping[number] = (numMapping[number] || 0) + 1;

      if (greatestFreq < numMapping[number]) {
        greatestFreq = numMapping[number];
        mode = number;
      }
    });

    if (mode) {
      return Number((Math.round(mode * 100) / 100).toFixed(2));
    }

    return 0;
  };

  // return the mode of recorded values
  getMode = (): IReturn | null => {
    let day: Array<number> = [];
    let night: Array<number> = [];
    let humidity: Array<number> = [];
    if (this.values.list) {
      this.values.list.forEach((e: IList): void => {
        day.push(e.temp.day);
        night.push(e.temp.night);
        humidity.push(e.humidity);
      });

      return {
        day: this.calculateMode(day),
        night: this.calculateMode(night),
        humidity: this.calculateMode(humidity)
      };
    }

    return null;
  };
}
